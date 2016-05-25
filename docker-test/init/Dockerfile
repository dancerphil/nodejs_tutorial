# 设置基础镜像
FROM ubuntu

# 如果上个步骤已经更新软件源，这步可以忽略
RUN apt-get update --fix-missing

# 安装 NodeJS 和 npm
RUN apt-get install -y nodejs npm

# 将目录中的文件添加至镜像的 /srv/hello 目录中
ADD . /srv/hello

# 设置工作目录
WORKDIR /srv/hello

# 安装 Node 依赖库
RUN npm install

# 暴露 3001 端口，便于访问
EXPOSE 3001

# 设置启动时默认运行命令
CMD ["nodejs”, “/srv/hello/index"]