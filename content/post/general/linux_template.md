+++
author = "Kishore"
title = "How to Create a Rocky Linux Server Template in VMware - Manual"
date = "2023-09-24"
description = ""
tags = [
    "VMware",
    "Home Lab",
]
+++

## Rocky Linux Server Template creation for Home Lab

To create a template, first we need to provision the virtual machine on which we will install Rocky Linux 8. Here are a few things to consider when doing so:

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

{{< youtube S9eJ840lFd0 >}}

<br>