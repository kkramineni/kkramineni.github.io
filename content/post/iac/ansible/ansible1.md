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
+++

AWX stands for “Ansible Web eXecutable” is a free and open-source project that allows you to easily manage and control Ansible projects. AWX is the upstream project of Red Hat Ansible Automation Platform. AWX provides a web-based user interface, a powerful REST API and allows to manage or sync inventory with other cloud sources
### Install AWX Operator Installtion on K3S
![img placeholder](/images/awx/001.png " ")

The open source projects Ansible and AWX, is a task engine and Web interface for scheduling and running playbook tasks on the inventories the playbooks interact with.

In this tutorial, we will install and configure Ansible AWX operator on Rocky Linux 8

{{% notice tip "Steps involved" %}}
1. Install Rocky Linux 8.x or CentOS 8.x server with a minimum of 4 GB RAM.
2. Install K3S
3. Install AWX operator on K3s
{{% /notice %}}


