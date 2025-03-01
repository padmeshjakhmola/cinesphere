interface Heading {
  text: string;
  link: string;
}

interface Movie {
  id?: string;
  name?: string;
  year?: number;
  poster?: string;
  imageUrl: string;
  videoUrl: string;
}

interface AWSFILEUPLOAD {
  Bucket: string;
  Key: string | undefined;
  Body?: Buffer | Uint8Array | Blob | string | ReadableStream;
  ContentType?: string;
  ACL?: string;
}
