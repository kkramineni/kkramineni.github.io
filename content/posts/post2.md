---
title: "How to Create a Windows Server Template in VMware - Manual"
date: 2023-09-09
draft: false
language: en

summary: This topic is to cretae a Windows server 2022 VM and install the OS and make it as Template. Later create LAB VMs using this template. We will be using VMware workstation Linked Clones for the individual VMs
description:
author: Kishore Kumar Ramineni

categories: Microsoft
tags:
    - Microsoft
    - VMware

---
## Windows Server Template creation for Home Lab

To create a template, first we need to provision the virtual machine on which we will install Windows Server 2022. Here are a few things to consider when doing so:

#### Config parameters
##### 1. Disk type
```
Thin Disk ( this is the default)
```
Since this is for Home Lab, we have chosen the ThinDisk type. selecting Thin Disk consumes the actual written data as my Laptop's Disk Space. You can choose the appropriate type
##### 2. SCSI Controller
```
LSI Logic

```

##### vCPU and Memory allocation:
It is recommended to provision your template with the minimum requirements. That way we ensure new VMs are not oversized when the resources aren’t tuned. 2GB of RAM and 2 vCPUs (2 sockets x 1 core) is usually the recommended choice for mixed workload setups.
```
2vCPU
2GB RAM
LAN segement as Network
```


### Watch the video on How to create a Windows Server template in VMware workstation

{{< youtube na1DKDkWYTY >}}

<br>