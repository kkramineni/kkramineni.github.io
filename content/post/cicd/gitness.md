+++
author = "Kishore"
title = "Getting sterted with Gitness"
date = "2024-01-01"
description = ""
tags = [
    "Cloud",
    "code hosting & pipeline engine",
    "CICD",
    "PoC",

]

thumbnail = "/images/cicd/Gitness.png"
+++

![img placeholder](/images/cicd/Gitness_01.png " ")

**Gitness**  is a Open-source code hosting & pipeline engine

By default, Gitness writes an SQLite database beneath /data in the running container.

---

###### Installation:

1. Prepare Linux Machine

For Lab purpose i have created a VM with the following specs
{{% notice tip "Gitness VM" %}}
- 4vCPU
- 8GB RAM
- 100GB free disk space
- Rocky Linux 9 with static IP
{{% /notice %}}



2. Create the Virtual Machines manually or using Packer template and clone using Terraform/OpenTofu. I have used the OpenTofu code, which will create VM with the required configuration
![img placeholder](/images/cicd/Gitness_02.png " Tofu/terrform code to create Gitness VM from template")



3. Login to VM and install docker ce using the following commands.
```shell
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

```

4. Install docker
```shell
sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

```
5. Add User to the docker group
```shell
sudo usermod -aG docker $USER

```

6. Enable and start the docker services
```shell
sudo systemctl enable --now docker.service
sudo systemctl enable --now containerd.service

```

7. Use the following Docker command to install Gitness
```shell
docker run -d \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /tmp/gitness:/data \
  --name gitness \
  --restart always \
  harness/gitness
```

5. Once the container is running, open `<IP Address:3000>`. Select SignUP enter UserID, Email and Password

In my case, i will be accessing using http://gitness.cloudbricks.local:3000

---

### Watch the video on How to install Gitness

{{< youtube zT8__ngMwos >}}

<br>
