FROM node

# 安装 Git
RUN apt-get install -y git

# 通过 Git 下载准备好的 MEAN 架构的网站代码
RUN git clone https://github.com/dancerphil/socket-node.git

# 安装 redis
RUN apt-get install -y redis-server

# 设置工作目录
WORKDIR /socket-node

# 安装 NodeJS 依赖库
RUN npm install

CMD [ "node","-v" ]