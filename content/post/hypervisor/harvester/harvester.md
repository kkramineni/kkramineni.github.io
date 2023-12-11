+++
author = "Kishore"
title = "Deploy Harvester HCI in VMware vSphere"
date = "2023-12-09"
description = ""
tags = [
    "Cloud",
    "HCI",
    "SuSE",
    "PoC",
    "VMware",
    "Kubevirt",
]
categories = "Cloud"
thumbnail = "/images/harvester_logo.svg"
series = "Private Cloud"
+++

![img placeholder](/images/harvester_logo.svg " ")
##### Harvester
Harvester is a modern Hyperconverged infrastructure (HCI) solution built for bare metal servers using enterprise-grade open source technologies including Kubernetes, KubeVirt and Longhorn.

This allows you to run both containers and VMs in your cluster. This will reduce operation overhead and provide consistency. This is all tried and tested technology combined to provide an open-source solution in this space.

![img placeholder](/images/harvester/harvester_architeture.png " ")
---

###### Requirements:
The follwing are the system requirements for Harvester Nodes

Type| Requirement
--------|-------
CPU| 8 Cores minimum
Memory| 32GB minimum
Disk| 250GB minimum
Network|1Gbps minimum

---
###### Installation:
1. Ensure that the required DNS entries are created. I'm using Static IP Address here

![img placeholder](/images/harvester/harvester_dns1.png " ")

2. Create the Virtual Machines manually with the required configuration. selected the fowlloing:

{{% notice info "Node-01" %}}
- Guest OS Type: SUSE OpenSUSE
- 8vCPU, harwarea virtualzation is enabled
- 32GB RAM
- 250GB Disk
- VMXNet3 Adapter
{{% /notice %}}

{{% notice info "Node-02" %}}
- Guest OS Type: SUSE OpenSUSE
- 8vCPU, harwarea virtualzation is enabled
- 32GB RAM
- 250GB Disk
- VMXNet3 Adapter
{{% /notice %}}

![img placeholder](/images/harvester/VM_Spces.png " ")

3. Mount the Harvester ISO file and boot the server by selecting the Harvester Installer option.
![img placeholder](/images/harvester/harvester-01.png " ")
3. Use the arrow keys to choose an installation mode. By default, the first node will be the management node of the cluster.
![img placeholder](/images/harvester/harvester-02.png " ")

``` "Create a new Harvester cluster": Use this to create a new cluster```

``` "Join an existing Harvester cluster": Use this to join the node to the exising cluster.  We need  Cluster token and VIP of the cluster to join the other Nodes```

``` "Install Harvester binaries only": If you choose this option, additional setup is required after the first bootup.```


3. Select the installation disk, in my case i am choosing the 250GB disk.By default, Harvester uses GUID Partition Table (GPT) partitioning schema for both UEFI and BIOS.
![img placeholder](/images/harvester/harvester-03.png " ")
3. configure the hostname ```harvester-01.cloudbricks.local```
![img placeholder](/images/harvester/harvester-06.png " ")
3. configure the network interface ```Select ens192(this may change in your setup) as interface. Bond Mode as active-backup and IPv4 method as Static```
![img placeholder](/images/harvester/harvester-05.png " ")
3. configure the DNS ```192.168.0.5```
![img placeholder](/images/harvester/harvester-07.png " ")
3. configure the Virtual IP. Selct mde as Static and VIP as  ```192.168.20.30```
![img placeholder](/images/harvester/harvester-08.png " ")
3. configure the Cluster Token  ```mytoken```
![img placeholder](/images/harvester/harvester-25.png " ")
3. configure the password to access the node ```myPassword```
![img placeholder](/images/harvester/harvester-10.png " ")
3. levae the defaults and continue with the next screens.
![img placeholder](/images/harvester/harvester-11.png " ")
3. Once the installation is complete, node restarts. After the restart, the Harvester console displays the management URL and status. The default URL of the web interface is ```https://virtualIP.```
![img placeholder](/images/harvester/harvester-12.png " ")
3. You will be prompted to set the password for the default ```admin``` user when logging in for the first time.
![img placeholder](/images/harvester/harvester-13.png " ")

---

###### Adding additional Nodes:

Complete the following steps to add additional nodes to the exisint cluster:

1. Mount the Harvester ISO file and boot the server by selecting the Harvester Installer option.
![img placeholder](/images/harvester/harvester-01.png " ")
3. Use the arrow keys to choose an installation mode. Select ```Join an existing Harvester cluster```
![img placeholder](/images/harvester/harvester-20.png " ")

3. Select the installation disk, in my case i am choosing the 250GB disk.By default, Harvester uses GUID Partition Table (GPT) partitioning schema for both UEFI and BIOS.
![img placeholder](/images/harvester/harvester-03.png " ")
3. configure the hostname ```harvester-02.cloudbricks.local```
![img placeholder](/images/harvester/harvester-21.png " ")
3. configure the network interface ```Select ens192(this may change in your setup) as interface. Bond Mode as active-backup and IPv4 method as Static```
![img placeholder](/images/harvester/harvester-22.png " ")
3. configure the DNS ```192.168.0.5```
![img placeholder](/images/harvester/harvester-23.png " ")
3. configure the Management address. Here we need to enter the VIP ```192.168.20.30```
![img placeholder](/images/harvester/harvester-24.png " ")
3. configure the Cluster Token  ```mytoken```
![img placeholder](/images/harvester/harvester-25.png " ")
3. configure the password to access the node ```myPassword```
![img placeholder](/images/harvester/harvester-26.png " ")
3. levae the defaults and continue with the next screens.Once the installation is complete, node restarts.
![img placeholder](/images/harvester/harvester-27.png " ")
3. login to the Management URL using VIP ```192.168.20.30``` or DNS name ```harvester-console.cloudbricks.local```
![img placeholder](/images/harvester/harvester-28.png " ")
3. Expand advanced and under settings go to ssl-certificates. Replace them with you ADCS generated SSL certificates.
![img placeholder](/images/harvester/harvester-29.png " ")
3. Post successful restart of services (which will be automatic), close the browser and access the management URL again. It should show as connection is secure
![img placeholder](/images/harvester/harvester-30.png " ")
3. Navigate to images in the left side menu and create image. I have uploaded two images (one RAW and one ISO) using file or URL method
![img placeholder](/images/harvester/harvester-31.png " ")
3. Create the VM using the uploaded images for test.
![img placeholder](/images/harvester/harvester-32-1.png " ")
3. check the console
![img placeholder](/images/harvester/harvester-33.png " ")

### Watch the video on How to Install Harvester HCI in VMware vSphere for Hands on

{{< youtube HJn6QbXR7u8 >}}

### Watch the video on How to Install Harvester HCI in VMware vSphere for Hands on

{{< youtube 5yXREqhHbhg >}}

<br>


