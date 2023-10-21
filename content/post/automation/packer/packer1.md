+++
author = "Kishore"
title = "How to setup Packer"
date = "2023-10-20"
description = ""
tags = [
    "IaC",
    "Automation",
    "Linux",
    "packer",
    "Home Lab",
]
categories = "Automation"
thumbnail = "/images/packer.png"
series = "packer"
+++

![img placeholder](/images/packer.png " ")
##### What is Packer?
Packer is a tool that lets you create identical machine images for multiple platforms from a single source template. Packer can create golden images to use in image pipelines.

In this tutorial we will see how to install and get started with Packer on Rocky Linux.

### Install Packer
---



{{% notice warning "HashiCorp packer conflict with cracklib gotcha" %}}
While setting up packer for the first time, packer installation conflicts with packer lib, which will be installed by default in RHEL based distros

workaround:
```
unlink /usr/sbin/packer
```
reboot the Server
{{% /notice %}}

---
Login to the code server as root, run the floowing commands

```shell
yum install -y yum-utils
```

![img placeholder](/images/packer/packer-001.png " ")


add the hashicorp repo

```shell
yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo
```
![img placeholder](/images/packer/packer-002.png " ")

Install packer

```shell
sudo yum -y install packer
```

![img placeholder](/images/packer/packer-003.png " ")

validate the packer installation by running

``` shell
packer version
```
![img placeholder](/images/packer/packer-004.png " ")



