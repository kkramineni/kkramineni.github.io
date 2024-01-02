+++
author = "Kishore"
title = "Installation of Kubernetes and KubeSphere on Linux"
date = "2024-01-01"
description = ""
tags = [
    "Cloud",
    "Containers",
    "kubernetes",
    "PoC",
    "Kubesphere",
    "Home Lab",
]
categories = "Containers"
thumbnail = "/images/kubesphere/kubesphere_logo.png"
series = "kubernetes"
+++

![img placeholder](/images/kubesphere/download.png " ")

**KubeSphere Container Platform:**

KubeSphere is a distributed operating system for cloud-native application management, using Kubernetes as its kernel.

***Open Source:***
A CNCF-certified Kubernetes platform, 100% open source, built and improved by the community.

***Easy to Run:***
Can be deployed on an existing Kubernetes cluster or Linux machines, supports online and air-gapped installation.

***Rich Features:***
Deliver DevOps, service mesh, observability, application management, multi-tenancy, storage and networking management in a unified platform.

***Modular and Pluggable:***
The functionalities are modularized and loosely coupled with the platform. Choose the modules according to your business needs.

---

###### All-in-One Installation:

1. Prepare Linux Machine

For Lab purpose i have created a VM with the following specs
{{% notice tip "kubesphere VM" %}}
- 8vCPU
- 16GB RAM
- 100GB free disk space
- Ubuntu 2204 with static IP
{{% /notice %}}



2. Create the Virtual Machines manually or using Packer template and clone using Terraform/OpenTofu. I have used the OpenTofu code, which will create VM with the required configuration
![img placeholder](/images/kubesphere/tofu_code.png " Tofu/terrform code to create kubesphere VM from template")



3. Login to kubesphere VM and run the following commands.
```shell
sudo apt-get update
sudo apt-get install socat conntrack ebtables ipset -y

```
4. Download KubeKey from its GitHub Release Page or run the following command:
```shell
curl -sfL https://get-kk.kubesphere.io | VERSION=v3.0.13 sh -
```

5. Make kk executable
```shell
chmod +x kk

```
6. Create a Kubernetes cluster with KubeSphere installed, run the following command:
```shell
sudo ./kk create cluster --with-kubernetes v1.22.12 --with-kubesphere v3.4.1

```
After running the command,  will see a table for environment check. Type yes to continue.

The output displays the IP address and port number of the web console, which is exposed through NodePort 30880 by default.

In my case, i will be accessing using http://kubesphere.cloudbricks.local:30880 with the default account and password `(admin/P@88w0rd).`

---

###### Enable DevOps and App store:

1. Login to the Kubesphere URL and go to Cluster config
![img placeholder](/images/kubesphere/kubesphere_login.png "kubesphere Login page")

1. Go to CRDs, in the search `"clusterconfig"`, then click on clusterConfiguration
![img placeholder](/images/kubesphere/kubesphere-01.png "Cluster Config")

1. Under ks-installer click on edit YAML
![img placeholder](/images/kubesphere/kubesphere-02.png "edit Cluster config")


1. scroll through and `change devops enabled to True`
![img placeholder](/images/kubesphere/kubesphere-03.png "enabling devops")

1. scroll through and `change openpitrix enabled to True`
![img placeholder](/images/kubesphere/kubesphere-04.png "enabling Appstore")

Wait for the changes to reflect, and relogin to the console to check App store

### Watch the video on How to setup K3S kubernetes cluster

{{< youtube V6GTwZ8TWKU >}}

<br>
