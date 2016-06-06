# 设置基础镜像
FROM c42

# 暴露端口
EXPOSE 8080

# 添加启动脚本
ADD start.sh /srv/socket-node
RUN chmod 755 /srv/socket-node/start.sh

# redis 启动脚本
ADD redis.conf /srv/socket-node
RUN chmod 755 /srv/socket-node/redis.conf

# 设置启动时默认运行命令
CMD ["bash", "start.sh"]