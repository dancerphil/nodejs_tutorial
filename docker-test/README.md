(DockerToolbox-1.11.1b.exe)[https://github.com/docker/toolbox/releases]

`An error occurred trying to connect: Get http://%2F%2F.%2Fpipe%2Fdocker_engine/v
1.23/info: open //./pipe/docker_engine: The system cannot find the file specifie
d.` =>
```
docker-machine start default
docker-machine env --shell cmd default
@FOR /f "tokens=*" %i IN ('docker-machine env --shell cmd default') DO @%i
```
(see)[https://github.com/docker/docker/issues/22338]

(入门)[http://www.jianshu.com/p/26f15063de7d]

(docker-node)[http://edwardchu.org/articles/docker-node-app.html]