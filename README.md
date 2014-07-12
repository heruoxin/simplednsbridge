#simplednsbridge

一个简单的本地 DNS 服务，原理就是监听本地 53 端口，初次访问时将域名与 config.json 中的正则匹配，然后向上游的多个 DNS 服务器查询，哪个结果返回最快就用哪个。

二次访问就有缓存了。

对 Google 等域名则走 TCP + 非标端口查询，目前还是没什么污染的……

##Install

目前只在 OS X 和 Ubuntu 下测试过。本机有安装 `npm` 包管理的情况下，直接执行

```
npm install -g simplednsproxy
```

安装即可。

安装后，OS X 用户可用下面的脚本设为开机自启动：

```
cd /usr/local/lib/node_modules/simplednsbridge/Run\ at\ startup/OS\ X/ #用 brew 装的 npm 的话应该是这个路径
sudo ./run.sh 
``` 

执行后请打开系统偏好设置，设置 DNS 为 127.0.0.1 。

##Config

`config.json` 和 `hosts` 都支持正则匹配域名。默认配置在大多数情况下够用了。

##Other

在国内的 Azure 上部署了 2 个，不想在本机部署的也可以试试。不过从 Azure 到本地的路程中也可能被污染。

```
42.159.193.164
42.159.82.38
```