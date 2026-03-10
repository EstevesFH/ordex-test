import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl'

interface IridescenceProps {
  color?: [number, number, number]
  speed?: number
  amplitude?: number
  mouseReact?: boolean
  className?: string
}

const vertexShader = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`

const fragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 mouse = uMouse;
  float dist = distance(uv, mouse);
  float wave = sin((uv.x + uv.y + uTime * uSpeed) * 10.0) * uAmplitude;
  float glow = smoothstep(0.6, 0.0, dist + wave);
  vec3 finalColor = mix(vec3(0.03, 0.08, 0.16), uColor, glow);
  gl_FragColor = vec4(finalColor, 0.95);
}
`

export default function Iridescence({
  color = [0.7, 0.8, 1.0],
  speed = 1.0,
  amplitude = 0.1,
  mouseReact = true,
  ...rest
}: IridescenceProps) {
  const ctnDom = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    if (!ctnDom.current) return
    const ctn = ctnDom.current

    const renderer = new Renderer({ alpha: true, dpr: window.devicePixelRatio })
    const gl = renderer.gl

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(...color) },
        uResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height),
        },
        uMouse: { value: new Float32Array([mousePos.current.x, mousePos.current.y]) },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed },
      },
    })

    const resize = () => {
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight)
      program.uniforms.uResolution.value = new Color(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height,
      )
    }

    window.addEventListener('resize', resize, false)
    resize()

    const mesh = new Mesh(gl, { geometry, program })
    let animateId = 0

    const update = (t: number) => {
      animateId = requestAnimationFrame(update)
      program.uniforms.uTime.value = t * 0.001
      renderer.render({ scene: mesh })
    }

    animateId = requestAnimationFrame(update)
    ctn.appendChild(gl.canvas)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = ctn.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = 1.0 - (e.clientY - rect.top) / rect.height
      mousePos.current = { x, y }
      program.uniforms.uMouse.value[0] = x
      program.uniforms.uMouse.value[1] = y
    }

    if (mouseReact) ctn.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animateId)
      window.removeEventListener('resize', resize)
      if (mouseReact) ctn.removeEventListener('mousemove', handleMouseMove)
      if (gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas)
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [amplitude, color, mouseReact, speed])

  return <div ref={ctnDom} style={{ width: '100%', height: '100%' }} {...rest} />
}
