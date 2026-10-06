+++
author = "Kishore"
title = "How to install NetApp Simulator"
date = "2024-01-22"
description = ""
tags = [
    "NetApp",
    "Storage",
    "VMware",
    "PoC",

]
categories = "Cloud"
thumbnail = "/images/storage/NetApp_Logo.png"
series = "Storage"
+++

![img placeholder](/images/storage/NetApp_Logo.png " ")

**NetApp ONTAP**  Simulate ONTAP is a simulator for running ONTAP software. It enables you to test the features of ONTAP without having to buy new hardware or disturb your production environment.
Simulate ONTAP is a VMware virtual machine that runs on a hypervisor.

System requirements:

* 2/4 vCPU
* 6 GB of RAM for one instance of the simulator
* 12 GB of RAM for two instances of the simulator
* *40 GB of free disk space for each instance of the simulator

###### For Lab purpose i have created a VM with the following specs
{{% notice tip "GitLab VM" %}}
- 4vCPU
- 6GB RAM
- 100GB free disk space
- Alma Linux 9 with static IP
{{% /notice %}}

---

###### Installation:
Download the ONTAP Software from NetApp Support Site appliance from Dell Downloads (you may required login)

1. Import the OVA into vSphere





2. Create the Virtual Machines manually or using Packer template and clone using Terraform/OpenTofu. I have used the OpenTofu code, which will create VM with the required configuration
![img placeholder](/images/cicd/gitlab_01.png " Tofu/terrform code to create GitLab VM from template")
3. Login to GitLab VM and run the following commands.
```shell
sudo systemctl disable --now firewalld
```
``this stops the firewall service and disable it``
![img placeholder](/images/cicd/gitlab_02.png " ")
4. install the prerequisites using the following command:
```shell
sudo dnf install -y curl policycoreutils openssh-server perl
```
![img placeholder](/images/cicd/gitlab_03.png " ")
5. Add the GitLab package repository
```shell

curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.rpm.sh | sudo bash
```
![img placeholder](/images/cicd/gitlab_04.png " ")
6. Install the GitLab package using the following command
```shell
sudo EXTERNAL_URL="http://repo.cloudbricks.local" dnf install -y gitlab
```
`replace the EXTERNAL_URL with the one you need`
![img placeholder](/images/cicd/gitlab_05.png " ")

Post complettion of installation, run the fowllowing command to check the status of gitlab.

```shell
gitlab-ctl status
```
![img placeholder](/images/cicd/gitlab_06.png " ")
7. access the GitLab URL as mentioned in the previous steps. To get the initial root password run the follwing command
```shell
cat /etc/gitlab/initial_root_password
```
![img placeholder](/images/cicd/gitlab_07.png " ")
In my case, i will be accessing using http://repo.cloudbricks.local with root as username and password from above command

8. Change the root password immediately by going to root avatar > Edit profile > Password
![img placeholder](/images/cicd/gitlab_08.png " ")
![img placeholder](/images/cicd/gitlab_09.png " ")
![img placeholder](/images/cicd/gitlab_10.png " ")
---

###### Confgure HTTPS:

1. Login to GitLab VM and edit `/etc/gitlab/gitlab.rb`
![img placeholder](/images/cicd/gitlab_11.png " ")

1. uncomment the following
> `nginx['ssl_certificate'] = "/etc/gitlab/ssl/#{node['fqdn']}.crt""`

> `nginx['ssl_certificate_key'] = "/etc/gitlab/ssl/#{node['fqdn']}.key"`

> Uncomment and change this line from False to True `nginx['redirect_http_to_https'] = true`

> `nginx['ssl_client_certificate'] = "/etc/gitlab/ssl/ca.crt"`

![img placeholder](/images/cicd/gitlab_12.png " ")

1. create a directory called ssl under `/etc/gitlab`
![img placeholder](/images/cicd/gitlab_13.png " ")


1. Copy ADCS generated SSL certs to  `/etc/gitlab/ssl`
![img placeholder](/images/cicd/gitlab_13.png " ")

1. change the   external url from http to https -  `external_url 'https://repo.cloudbricks.local'`
![img placeholder](/images/cicd/gitlab_13.png " ")

1. Once the SSL certificates are copied and gitlab.rb is edited properly, run the following command

```shell
gitlab-ctl reconfigure
```

5. Refresh the Gitlab URL/ open new tab and access the url
![img placeholder](/images/cicd/gitlab_14.png " ")


---

### Watch the video on How to install and configure GitLab community Edition

{{< youtube BpBpRGa1AIw >}}

<br>