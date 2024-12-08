import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidateTag } from "next/cache";
import { auth } from "../../../../auth";
import { S3_CONFIG, s3Client } from "@/lib/s3/config";

export async function POST(req: Request) {
  const { fileName, fileType, fileSize, checksum } = await req.json();
  const session = await auth();
  if (!session) {
    return new Response(JSON.stringify({ failure: "not authenticated" }), {
      status: 401, // o el código de estado apropiado
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!S3_CONFIG.allowedFileTypes.includes(fileType)) {
    return new Response(JSON.stringify({ failure: "File type not allowed" }), {
      status: 400, // o el código de estado apropiado
      headers: { "Content-Type": "application/json" },
    });
  }
  if (fileSize > S3_CONFIG.maxFileSize) {
   return new Response(JSON.stringify({ failure: "File size too large" }), {
      status: 400, // o el código de estado apropiado
      headers: { "Content-Type": "application/json" },
    });
  }

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
  };
  const command = new PutObjectCommand(params);
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  const publicUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  revalidateTag("upload");
  return new Response(JSON.stringify({ presignedUrl: url, publicUrl,fileName }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
