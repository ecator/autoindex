# autoindex

nginx默认的autoindex页面太丑了  :smiley_cat: 就重新写了一个，支持IE10+，增加了递归搜索功能。

# 开发

确保本地有nodejs环境，然后安装依赖：

```sh
npm install
```

更改默认标题可以修改`webpack.config.js`中的`plugins.HtmlWebpackPlugin.title`属性。

修改完成后用下面的命令编译：

```sh
npm run build
```

目标文件会生成到`dist`目录，不过只有`index.html`和`favicon.ico`两个文件有用，其他的可以不用上传到服务器。

> 为了方便配置nginx的路由，把所有东西都编译到了`index.html`一个文件。

如果需要编译生产环境的版本可以用下面的命令：

```sh
npm run dist
```

> 需要安装[jq](https://stedolan.github.io/jq/)工具，生产环境版本是经过压缩的。


# nginx配置

```nginx
server {
  listen       80;
  server_name  autoindex.example.com;
  error_page 404 403 /index.html;
  root   /path/to/data;

  location ~ ^/(index\.html|favicon\.ico)$ {
    root /path/to/autoindex/dist;
  }

  location ^~ /autoindexjson {
    alias   /path/to/data;
    charset utf8;
    autoindex on;
    autoindex_exact_size off;
    autoindex_localtime on;
    autoindex_format json;
  }
}

```

将编译好的`index.html`和`favicon.ico`上传到服务器的`/path/to/autoindex/dist`即可，`/path/to/data`是实际需要公开的路径，`/autoindexjson`是获取文件列表的api路径，如果可能跟数据路径冲突可以修改`webpack.config.js`中的`plugins.HtmlWebpackPlugin.templateParameters.APIPATH`来修改，两者保持一致即可。


# 参考

- [jgthms/bulma: Modern CSS framework based on Flexbox](https://github.com/jgthms/bulma)
- [ionic-team/ionicons: Premium hand-crafted icons built by Ionic, for Ionic apps and web apps everywhere 🌎](https://github.com/ionic-team/ionicons)

