export default function(webpackConfig) {
  delete webpackConfig.resolve.alias['@babel/runtime'];
  return webpackConfig;
}