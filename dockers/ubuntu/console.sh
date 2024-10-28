docker pull ubuntu:24.04
docker pull ubuntu:20.04

docker run -it --name ubuntu24 ubuntu:24.04 /bin/bash
docker run -it --name ubuntu20 ubuntu:20.04 /bin/bash

# cat /etc/os-release