
import { computeSHA256 } from "../utils"
export interface MediaDto {
  publicUrl: string;
  fileName: string;
}

export async function UploadToS3(file: File): Promise<{ publicUrl: string; fileName: string }> {
  console.log(file)
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      checksum: await computeSHA256(file)
    })
  })
  const { presignedUrl, publicUrl, fileName } = await res.json()
  await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type
    },
    body: file
  })

  return { publicUrl, fileName }
}
export async function UploadManyToS3(files: File[]): Promise<MediaDto[]> {
  const uploadPromises = files.map(async file => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          checksum: await computeSHA256(file)
        })
      })

      const { presignedUrl, publicUrl, fileName } = await res.json()
      await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type
        },
        body: file
      })

      return { publicUrl, fileName }
    } catch (error) {
      console.error(`Failed to upload file: ${file.name}`, error)
      return null
    }
  })

  const publicUrls = await Promise.all(uploadPromises)

  return publicUrls.filter(url => url !== null) as { publicUrl: string; fileName: string }[];
}
