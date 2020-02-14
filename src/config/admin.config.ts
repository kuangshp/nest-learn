export default {
  adminPath: 'admin',
  sessionMaxAge: 30 * 1000 * 60,
  staticPrefixPath: '', // 静态文件的前缀
  supportImgTypes: ['.png', '.jpg', '.gif', '.jpeg'],
  // 使用jimp处理图片的参数
  jimpSize: [{ width: 100, height: 100 }, { width: 200, height: 200 }, { width: 400, height: 400 }]
}