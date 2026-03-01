import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dtlz0jfb6',
      api_key: '157928746713174',
      api_secret: 'zSuH4EUbwEwviwEbBkOTzRKrV4Q',
    });
  },
};