+++
author = "Kishore"
title = "How to Install and Configure Ansible AWX on Rocky Linux 8"
date = "2023-09-24"
description = ""
tags = [
    "AWX",
    "Ansible",
    "Home Lab",
]
+++

AWX stands for “Ansible Web eXecutable” is a free and open-source project that allows you to easily manage and control Ansible projects. AWX is the upstream project of Red Hat Ansible Automation Platform. AWX provides a web-based user interface, a powerful REST API and allows to manage or sync inventory with other cloud sources
### Lab Setup:
<image src="/images/Lab_BG.png" height="auto" width="auto" position="center">
The open source projects Ansible and AWX, is a task engine and Web interface for scheduling and running playbook tasks on the inventories the playbooks interact with.
In this tutorial, we will install and configure Ansible AWX operator on Rocky Linux 8

```
- Rocky Linux 8.x or CentOS 8.x server with a minimum of 4 GB RAM.
- ansible
- k3s
- AWX operator on K3s
```
1. Log in as root or user with privileges sudo


