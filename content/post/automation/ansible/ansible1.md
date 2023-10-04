+++
author = "Kishore"
title = "How to Install and Configure Ansible AWX on Rocky Linux 8"
date = "2023-09-24"
description = ""
tags = [
    "AWX",
    "Automation",
    "Linux",
    "Ansible",
    "Home Lab",
]
categories = "Automation"
thumbnail = "images/awx/awx_logo.png"
+++

AWX stands for “Ansible Web eXecutable” is a free and open-source project that allows you to easily manage and control Ansible projects. AWX is the upstream project of Red Hat Ansible Automation Platform. AWX provides a web-based user interface, a powerful REST API and allows to manage or sync inventory with other cloud sources
### Install AWX Operator Installtion on K3S
![img placeholder](/images/awx/awx_logo.png " ")

The open source projects Ansible and AWX, is a task engine and Web interface for scheduling and running playbook tasks on the inventories the playbooks interact with.

In this tutorial, we will install and configure Ansible AWX operator on Rocky Linux 8

{{% notice tip "Steps involved" %}}
1. Install Rocky Linux 8.x or CentOS 8.x server with a minimum of 4 GB RAM.
2. <a href="https://cloudbricks.dev/post/containers/k3s/k3s-01/">Install K3S</a>
3. Install AWX operator on K3s
{{% /notice %}}

### Install AWX Operator:

1. Install pre-requisites with the following command
```shell
sudo yum -y install git make
```
2. Download/Clone the AWX Repo

```python
git clone https://github.com/ansible/awx-operator.git
```


``` powershell
cd awx-operator/
sudo yum -y install jq
RELEASE_TAG=`curl -s https://api.github.com/repos/ansible/awx-operator/releases/latest | grep tag_name | cut -d '"' -f 4`
echo $RELEASE_TAG
```