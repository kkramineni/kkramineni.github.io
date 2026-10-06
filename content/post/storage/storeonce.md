+++
author = "Kishore"
title = "How to install HPE StoreOnce and configure with VMware"
date = "2024-01-28"
description = ""
tags = [
    "HPE Storeonce",
    "Storage",
    "VMware",
    "PoC",

]
categories = "Cloud"
thumbnail = "/images/storage/storeonce_1.jpg"
series = "Storage"
+++

![img placeholder](/images/storage/storeonce_1.jpg " ")

***HPE StoreOnce VSA***  is a virutal appliance which runs on VMware ESXi environement. This VSA will be used for automation testing and as a Storage (NAS and Catalyst for Veeam Backup and Replication) for my Netsted ESXi deployments

System Requirements:

* vCenter
* ESXi host
* 24GB RAM
* 2vCPU
* 250 (OS) + 1TB (Data) Thin proviosioned Disk space

---

###### Installation:
Download the VSA appliance from HPE Downloads (you require login, register if not already)

1. Import the OVA into vSphere. Right Click on host and select deploy OVF template. browse the OVA location and select the OVA
![img placeholder](/images/storage/store-01.png " ")
1. Provide the virtual machine name
![img placeholder](/images/storage/store-02.png " ")
1. Click on Ingore All for certificate errors (if any)

1. Choose the appropriate Network for Management and data
![img placeholder](/images/storage/store-04.png " ")
1. Enter the system name and IP details
![img placeholder](/images/storage/store-05.png " ")
1. once OVA import is sucessful,power on the VM and monitor the progress, it may take while
![img placeholder](/images/storage/store-06.png " ")
1. Once IP details are shown in the VMware console, open browser and acees the unisphere using the IP.
The default credentials to login to Unisphere are: `admin` and `Password123#`
![img placeholder](/images/storage/store-07.png " ")
1. Proceed with the initial configuration as shown below
![img placeholder](/images/storage/store-08.png " ")
![img placeholder](/images/storage/store-09.png " ")
![img placeholder](/images/storage/store-10.png " ")
![img placeholder](/images/storage/store-11.png " ")
![img placeholder](/images/storage/store-12.png " ")
![img placeholder](/images/storage/store-13.png " ")
![img placeholder](/images/storage/store-14.png " ")
![img placeholder](/images/storage/store-15.png " ")
![img placeholder](/images/storage/store-16.png " ")
![img placeholder](/images/storage/store-18.png " ")
1. Shutdown the VM and add additional Disks. I have created 3 disks of 1TB each and selected thin provision
![img placeholder](/images/storage/store-19.png " ")
![img placeholder](/images/storage/store-20.png " ")
1. Power on the Virtual Machine and login to Unisphere console, we should be able to see the Virtual Disks
![img placeholder](/images/storage/store-21.png " ")
1. navigate to Storage > pools and click `+` to create new pool
![img placeholder](/images/storage/store-22.png " ")
1. Enter the pool name
![img placeholder](/images/storage/store-23.png " ")
1. change the `Storage Tier` as you wish and click on next
![img placeholder](/images/storage/store-24.png " ")
1. select the Tier and click on Next
![img placeholder](/images/storage/store-25.png " ")
1. Create the Storage pool job starts.
![img placeholder](/images/storage/store-26.png " ")
1. Post suceessfull creation of the job, we should be able to see the pool with the configured capacity
![img placeholder](/images/storage/store-27.png " ")

---
###### Configure iSCSI and VMware datastore:
In this section we will be configuring the vSphere Environment with iSCSI and creation of datastore.

##### vSphere config:

1. Login to vCenter server, and select the host. Click on Configure.
![img placeholder](/images/storage/store-30.png " ")
1. select `Storage` > `Storage Adapters` and click on `Add iSCSI adapter`
![img placeholder](/images/storage/store-31.png " ")
1. Click on OK to add new Software iSCSI adapter
![img placeholder](/images/storage/store-32.png " ")
1. Wait for the task to finish, we should be able to see the VMHBA65 model iSCSI software adapter
![img placeholder](/images/storage/store-33.png " ")

---

##### VSA config:

Login to Unisphere console,
1. Under settngs, check `Access` > `Ethernet`
![img placeholder](/images/storage/store-35.png " ")
1. Ensure that you have assinged the IP
![img placeholder](/images/storage/store-34.png " ")
1. Navigate to Main Page, then click on **VMware** under **Access**
![img placeholder](/images/storage/store-36.png " ")
1. Click on `+` symbol and add new vCenter, provide the vCetner server details and click on Find, we should be able to discover the ESXi hosts
![img placeholder](/images/storage/store-37.png " ")
1. Leave the VASA provider unchecked and Proceed, Summary should show as shown below. Click on Finish
![img placeholder](/images/storage/store-38.png " ")
1. Adding VMware vCenter Server should finish
![img placeholder](/images/storage/store-39.png " ")
1. Navigate to **VMware** under **Storage** and click on **`+`**
![img placeholder](/images/storage/store-40.png " ")
1. Select VMFS6 and click on Next
![img placeholder](/images/storage/store-41.png " ")
1. Name the datastore (e.g. DS-SRC)
![img placeholder](/images/storage/store-42.png " ")
1. Enter the Datastore Size and click on Next
![img placeholder](/images/storage/store-43.png " ")
1. Under access, Select the ESXi hosts that needs Datastore to be configured and click on OK
![img placeholder](/images/storage/store-44.png " ")
1. Select both the ESXi hosts and click on Next
![img placeholder](/images/storage/store-45.png " ")
1. Create VMFS datastore jpb should finish
![img placeholder](/images/storage/store-46.png " ")

---

1. Go to VMware vSphere and check the storage adapters, we should see devices updated. If not, click on **RESCAN STORAGE**
![img placeholder](/images/storage/store-47.png " ")

![img placeholder](/images/storage/store-48.png " ")
1. Go to Datastores and check the Datastore visibility and capacity
![img placeholder](/images/storage/store-49.png " ")
