import type { CapacitorConfig } from '@capacitor/cli';

// pengaturan capacitor untuk membungkus aplikasi web menjadi aplikasi mobile
const config: CapacitorConfig = {
  // id unik aplikasi di perangkat
  appId: 'io.ionic.starter',

  // nama aplikasi
  appName: 'uts',

  // folder hasil build web yang dibungkus oleh capacitor
  webDir: 'www'
};

export default config;
