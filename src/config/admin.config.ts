const PREFIX = process.env.PREFIX || '/';
export default {
  adminPath: 'admin',
  whiteUrl: [`${PREFIX}/login/`, `${PREFIX}/register/`], // 白名单url
  staticPrefixPath: '', // 静态文件的前缀
  supportImgTypes: ['.png', '.jpg', '.gif', '.jpeg'],
  // 使用jimp处理图片的参数
  jimpSize: [{ width: 100, height: 100 }, { width: 200, height: 200 }, { width: 400, height: 400 }]
}