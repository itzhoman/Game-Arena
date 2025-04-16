import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { random } from 'maath'

const ParticlesBackground = () => {
  const ref = useRef()
  
  // Use useMemo to ensure the sphere positions are only calculated once
  const sphere = useMemo(() => {
    const positions = new Float32Array(5000 * 3)
    random.inSphere(positions, { radius: 1.5 })
    return positions
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#6366f1" // Using a proper color value instead of CSS variable
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

export default ParticlesBackground 