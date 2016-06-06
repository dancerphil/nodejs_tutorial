FROM node3

# 暴露端口
EXPOSE 8080

# 添加启动脚本
ADD start.sh /
RUN chmod +x /start.sh

ADD redis.conf /
RUN chmod +x /redis.conf

# 设置启动时默认运行命令
CMD ["bash", "/start.sh"]