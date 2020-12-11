# reactFramework
### 1 前端端口配置
在根目录下的 package.json 文件中的 scripts 项进行配置，默认为 3008 端口；
### 2 其他页面编写位置
在 src 文件夹下新建 views 文件夹，在该文件夹中进行编写；
### 3 通用组件
#### 3.1 文件上传组件
- 文件位置：/src/publicComponents/inputStyleUploadFile.jsx
- 调用时传入 setSelectedFile 方法即可获取文件；
- 该组件在清空文件时可能报错；
