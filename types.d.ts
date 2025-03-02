interface Heading {
  text: string;
  link: string;
}

// interface Movie {
//   id?: string;
//   name?: string;
//   year?: number;
//   poster?: string;
//   imageUrl: string;
//   videoUrl: string;
// }

interface AWSFILEUPLOAD {
  Bucket: string;
  Key: string | undefined;
  Body?: Buffer | Uint8Array | Blob | string | ReadableStream;
  ContentType?: string;
  ACL?: string;
}

interface GetObjectParam {
  Bucket: string;
  Key: string;
}


  interface Movie {
    id: string;
    moviename: string;
    year: string;
    moviePoster: string;
    movieVideo: string;
  }
