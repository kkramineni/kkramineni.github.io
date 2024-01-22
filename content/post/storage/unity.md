+++
author = "Kishore"
title = "How to install Dell Unity VSA and configure with VMware"
date = "2024-01-21"
description = ""
tags = [
    "Dell Unity VSA",
    "Storage",
    "VMware",
    "PoC",

]
categories = "Cloud"
thumbnail = "/images/storage/unity-logo.png"
series = "Storage"
+++

![img placeholder](/images/storage/unity-logo.png " ")

**Dell Unity VSA**  is a virutal appliance hich runs on VMware ESXi environement. This VSA will be used for automation testing and as a Storage (iscsi) for my Netsted ESXi deployments

System Requirements:

* vCenter
* ESXi host
* 12GB RAM
* 2vCPU
* Disk space as required

---

###### Installation:
Download the VSA appliance from Dell Downloads (you may required login)

1. Import the OVA into vSphere. Right Click on host and select deploy OVF template. browse the OVA location and select the OVA
![img placeholder](/images/storage/unity-01.png " ")
1. Provide the virtual machine name
![img placeholder](/images/storage/unity-02.png " ")
1. Click on Ingore All for certificate errors (if any)
![img placeholder](/images/storage/unity-03.png " ")
1. Choose the appropriate Network for Management and data
![img placeholder](/images/storage/unity-04.png " ")
1. Enter the system name and IP details
![img placeholder](/images/storage/unity-05.png " ")
1. once OVA import is sucessful,power on the VM and monitor the progress, it may take while
![img placeholder](/images/storage/unity-06.png " ")
1. Once IP details are shown in the VMware console, open browser and acees the unisphere using the IP.
The default credentials to login to Unisphere are: `admin` and `Password123#`
![img placeholder](/images/storage/unity-07.png " ")
1. Proceed with the initial configuration as shown below
![img placeholder](/images/storage/unity-08.png " ")
![img placeholder](/images/storage/unity-09.png " ")
![img placeholder](/images/storage/unity-10.png " ")
![img placeholder](/images/storage/unity-11.png " ")
![img placeholder](/images/storage/unity-12.png " ")
![img placeholder](/images/storage/unity-13.png " ")
![img placeholder](/images/storage/unity-14.png " ")
![img placeholder](/images/storage/unity-15.png " ")
![img placeholder](/images/storage/unity-16.png " ")
![img placeholder](/images/storage/unity-18.png " ")
1. Shutdown the VM and add additional Disks. I have created 3 disks of 1TB each and selected thin provision
![img placeholder](/images/storage/unity-19.png " ")
![img placeholder](/images/storage/unity-20.png " ")
1. Power on the Virtual Machine and login to Unisphere console, we should be able to see the Virtual Disks
![img placeholder](/images/storage/unity-21.png " ")
1. navigate to Storage > pools and click `+` to create new pool
![img placeholder](/images/storage/unity-22.png " ")
1. Enter the pool name
![img placeholder](/images/storage/unity-23.png " ")
1. change the `Storage Tier` as you wish and click on next
![img placeholder](/images/storage/unity-24.png " ")
1. select the Tier and click on Next
![img placeholder](/images/storage/unity-25.png " ")
1. Create the Storage pool job starts.
![img placeholder](/images/storage/unity-26.png " ")
1. Post suceessfull creation of the job, we should be able to see the pool with the configured capacity
![img placeholder](/images/storage/unity-27.png " ")

---
###### Configure iSCSI and VMware datastore:
In this section we will be configuring the vSphere Environment with iSCSI and creation of datastore.

##### vSphere config:

1. Login to vCenter server, and select the host. Click on Configure.
![img placeholder](/images/storage/unity-30.png " ")
1. select `Storage` > `Storage Adapters` and click on `Add iSCSI adapter`
![img placeholder](/images/storage/unity-31.png " ")
1. Click on OK to add new Software iSCSI adapter
![img placeholder](/images/storage/unity-32.png " ")
1. Wait for the task to finish, we should be able to see the VMHBA65 model iSCSI software adapter
![img placeholder](/images/storage/unity-33.png " ")

---

##### VSA config:

Login to Unisphere console,
1. Under settngs, check `Access` > `Ethernet`
![img placeholder](/images/storage/unity-35.png " ")
1. Ensure that you have assinged the IP
![img placeholder](/images/storage/unity-34.png " ")
1. Navigate to Main Page, then click on **VMware** under **Access**
![img placeholder](/images/storage/unity-36.png " ")
1. Click on `+` symbol and add new vCenter, provide the vCetner server details and click on Find, we should be able to discover the ESXi hosts
![img placeholder](/images/storage/unity-37.png " ")
1. Leave the VASA provider unchecked and Proceed, Summary should show as shown below. Click on Finish
![img placeholder](/images/storage/unity-38.png " ")
1. Adding VMware vCenter Server should finish
![img placeholder](/images/storage/unity-39.png " ")
1. Navigate to **VMware** under **Storage** and click on **`+`**
![img placeholder](/images/storage/unity-40.png " ")
1. Select VMFS6 and click on Next
![img placeholder](/images/storage/unity-41.png " ")
1. Name the datastore (e.g. DS-SRC)
![img placeholder](/images/storage/unity-42.png " ")
1. Enter the Datastore Size and click on Next
![img placeholder](/images/storage/unity-43.png " ")
1. Under access, Select the ESXi hosts that needs Datastore to be configured and click on OK
![img placeholder](/images/storage/unity-44.png " ")
1. Select both the ESXi hosts and click on Next
![img placeholder](/images/storage/unity-45.png " ")
1. Create VMFS datastore jpb should finish
![img placeholder](/images/storage/unity-46.png " ")

---

1. Go to VMware vSphere and check the storage adapters, we should see devices updated. If not, click on **RESCAN STORAGE**
![img placeholder](/images/storage/unity-47.png " ")

![img placeholder](/images/storage/unity-48.png " ")
1. Go to Datastores and check the Datastore visibility and capacity
![img placeholder](/images/storage/unity-49.png " ")
