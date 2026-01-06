import Image from "next/image"
import React from "react"

export default function AdminLogo() {
  return (
    <Image
      src="/admin-logo.png"
      alt="Admin Logo"
      width={300}
      height={120} // adjust to your logo aspect ratio
      style={{
        height: "auto",
      }}
      priority
    />
  )
}
