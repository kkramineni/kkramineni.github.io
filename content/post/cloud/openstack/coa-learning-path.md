+++
author = "Kishore"
title = "Certified OpenStack Administrator (COA) — Series Roadmap & Lab"
date = "2026-10-18"
description = "A hands-on series for the Certified OpenStack Administrator exam: build a Kolla-Ansible lab on OpenStack 2026.1 Gazpacho, then work through every COA knowledge domain with real commands and screenshots."
tags = ["Cloud", "Openstack", "IaaS", "Certification", "Series"]
categories = "Cloud"
series = "COA"
draft = true
+++

## About This Series

The **Certified OpenStack Administrator (COA)** is the only professional certification offered by the OpenInfra Foundation, and it is a *performance-based* exam. You are given a live OpenStack cloud and asked to do the work — from the CLI and from the Horizon dashboard. There is no multiple-choice section to memorise your way through.

That has a practical consequence: preparing for it with slides does not work. You need a cloud you can break.

So this series builds one. Every post works against a real **Kolla-Ansible** deployment running **OpenStack 2026.1 "Gazpacho"**, with the commands, output and screenshots taken from that environment. Where a topic maps to a weighted part of the exam, the weighting is called out, so you can tell the difference between something worth an afternoon and something worth five minutes.

{{% notice info "Series in progress" %}}
Posts are being published progressively. Entries marked **Coming soon** are planned and linked — the post will appear at that URL as soon as it is ready. Follow the series from the top down for the intended reading order.
{{% /notice %}}

## What You Will Learn

By the end of the series you will be able to:

- Stand up a working OpenStack cloud from scratch with Kolla-Ansible
- Authenticate and drive it from the CLI, and know your way around Horizon
- Model identity — domains, projects, users, groups, roles and policy files
- Upload, share and annotate images
- Launch, secure, snapshot and quota-manage instances
- Build tenant and provider networks, routers, security groups and floating IPs
- Create, attach, back up and encrypt block volumes
- Manage objects in Swift containers, including permissions
- Understand where each of these lives in the exam, and what tends to go wrong in a lab

## The Exam at a Glance

The facts below come from the [official COA page](https://www.openstack.org/coa/) and the Certification Candidate Handbook (v3.0, effective 14 August 2025).

| | |
|---|---|
| Cost | $400 |
| Duration | 3 hours |
| Format | Performance-based — CLI and the Horizon Dashboard |
| Delivery | Online, proctored with webcam, microphone and screen sharing |
| Retakes | None |
| Validity | 36 months from the passing date |
| Results | Typically 7–10 business days |
| Language | English |
| Release under test | **Caracal (2024.1)** |
| Scheduling | Booked at the time of purchase |

A few things worth knowing before you pay:

- **Photo ID is mandatory.** If you cannot produce acceptable, non-expired photo ID for the proctor, entry is refused — with no refund and no rescheduling.
- **You supply the hardware.** Chrome or Chromium, a reliable internet connection, a webcam and a microphone — and a clean, unobstructed surface, with a webcam you can pan around the room if asked.
- **The exam assumes at least six months of OpenStack experience**, plus basic Linux command-line skills and a *basic understanding of Ubuntu Linux process management*.

## Knowledge Domains

The exam is weighted across six content domains. These weights are the best guide you will get to where your study time should go:

| Domain | Weight | What you are expected to do |
|---|---|---|
| Compute | 35% | Flavors, instances, SSH keys and access, security groups, floating IPs, host consoles, instance snapshots, quotas |
| Networking | 30% | Routers, networks and subnets, public and project networks, security groups and rules, floating IPs, quotas |
| Identity management | 15% | Domains, projects, users, roles, the member/admin distinction, policy files, RC files |
| Block Storage | 10% | Creating volumes, attaching and mounting them, snapshots, backups and restore, quotas |
| Image management | 5% | Uploading and managing images, properties, visibility |
| Object Storage | 5% | Uploading and managing objects in Swift containers, and container permissions |

Sitting above all of them is an unweighted framing domain, **OpenStack APIs** — using the Dashboard UI and the OpenStack CLI client. You will lean on it in every other domain, so it is where the series starts.

{{% notice tip "Where the marks actually are" %}}
Compute and Networking are **65% of the exam** between them. Identity is another 15%. If you are short on time, that is the triangle to be strong in — Block Storage, Image management and Object Storage together are only 20%.
{{% /notice %}}

## The Version Question

Settle this early, because it catches people out: **the exam tests Caracal (2024.1)**, which the OpenStack project now lists as unmaintained. The certification trails the project by roughly two years.

This series deliberately does **not** pin its lab to Caracal. It builds on **2026.1 "Gazpacho"** instead, for three reasons:

- Gazpacho is a **SLURP** release, so it has a longer supported life than a normal six-month release and is a sensible thing to keep running afterwards.
- The CLI, the Horizon dashboard and the service APIs you are tested on are the same shape. `openstack server create`, `openstack network create` and `openstack role add` mean what they meant in Caracal; the exam is testing whether you can *operate* OpenStack, not whether you have memorised one release's screens.
- A lab on a current release stays useful after the exam is over.

{{% notice warning "Where this can bite you" %}}
If a command, option or screen differs between Gazpacho and the Caracal the exam runs on, I flag it in the post rather than pretending the difference does not exist. Treat the screenshots as the current release and double-check anything version-sensitive against the exam's target release.
{{% /notice %}}

## Series Roadmap

The series is organised into nine parts. Read them in order if OpenStack is new to you; jump straight to a domain if you already know your way around.

| # | Post | Status | What it covers |
|---|---|---|---|
| 1 | Lab Build: Kolla-Ansible All-in-One | Coming soon | The Ubuntu VM, Kolla-Ansible 22.x, deploying Gazpacho, and verifying a working cloud — deliberately minimal |
| 2 | APIs & Horizon | Coming soon | RC files, `clouds.yaml`, the CLI, API versions and microversions, and a Horizon tour |
| 3 | Identity Management | Coming soon | Domains, projects, users, groups, roles, assignments, the service catalog and policy files |
| 4 | Image Management | Coming soon | Creating and uploading images, formats, properties, visibility and sharing |
| 5 | Compute | Coming soon | Flavors, keypairs, security groups, instances, snapshots, consoles, floating IPs and quotas |
| 6 | Networking | Coming soon | Provider and tenant networks, routers, subnets, ports, security group rules and floating IPs |
| 7 | Block Storage | Coming soon | Volumes, types, attaching and mounting, snapshots, backups, quotas and encryption |
| 8 | Object Storage | Coming soon | Swift containers, objects, permissions, temporary URLs and large objects |
| 9 | Exam Day: Quotas, Troubleshooting & Beyond | Coming soon | Quotas across services, the failures that cost marks, and what comes after the certification |

## The Lab

The series uses a single-node **all-in-one** deployment, which is enough to cover every COA domain — and it is the same tooling you would use for a small production cloud, so nothing here is throwaway.

| Component | Choice |
|---|---|
| Operating system | Ubuntu 24.04 LTS (Noble) |
| Deployment tool | Kolla-Ansible 22.x |
| OpenStack release | 2026.1 Gazpacho (containers) |
| Networking backend | OVN |
| Topology | All-in-one, single VM |

Ubuntu is not an arbitrary choice here. It is one of the four host operating systems Kolla-Ansible 2026.1 supports, and it matches what the exam assumes of candidates — the official requirements explicitly expect a basic understanding of Ubuntu Linux process management. Prepare on the same distribution and one whole category of surprise disappears.

{{% notice info "Sizing" %}}
All-in-one is not lightweight — you are running Keystone, Nova, Neutron, Glance, Cinder, Horizon, RabbitMQ, MariaDB and the OVN stack at once. Budget **4 vCPU, 8 GB RAM and 60 GB of disk** as a floor. Part 1 pins the exact versions used.
{{% /notice %}}

Part 1 is deliberately minimal. The goal is a cloud you can practise every exam domain on, not a production deployment — so there is one node, default settings, and no HA. Deeper Kolla-Ansible material (multi-node topologies, HAProxy and TLS hardening, reconfiguration, upgrades) is a topic in its own right and is not the point of this series.

## Official References

Everything in this series is checked against the upstream documentation. These are the primary references:

| Reference | Covers |
|---|---|
| [COA exam page](https://www.openstack.org/coa/) | Exam details, purchase, and training partners |
| [COA Requirements](https://www.openstack.org/coa/requirements) | The authoritative list of knowledge domains and tasks |
| [Certification Candidate Handbook](https://object-storage-ca-ymq-1.vexxhost.net/swift/v1/6e4619c416ff4bd19e1c087f27a43eea/www-assets-prod/The-OpenStack-Foundation-Certification-Candidate-Handbook.pdf) | Policies, rules and candidate requirements |
| [OpenStack CLI Reference](https://docs.openstack.org/python-openstackclient/latest/cli/command-list.html) | Every `openstack` command and its arguments |
| [OpenStack API Reference](https://docs.openstack.org/api-ref/) | Service APIs and microversion history |
| [Horizon documentation](https://docs.openstack.org/horizon/latest/) | The dashboard used in the lab |
| [Kolla-Ansible documentation](https://docs.openstack.org/kolla-ansible/2026.1/) | The deployment tool used throughout |
| [OpenStack 2026.1 release notes](https://releases.openstack.org/gazpacho/) | What is actually in the lab's release |

## Prerequisites

Before starting, you should be comfortable with:

- The Linux command line, and process management on Ubuntu specifically
- Networking fundamentals: subnets, routing, NAT, DNS and what a VLAN is
- Basic virtualization concepts — you do not need to have run OpenStack before
- SSH key pairs and how they are used to reach a server

You will also need somewhere to run the lab VM — VMware Workstation, vSphere, or any hypervisor that can give you 4 vCPU, 8 GB RAM and 60 GB of disk.

## How to Use This Series

**New to OpenStack?** Start at Part 1 and work down. Each post assumes the previous one is in place.

**Already running OpenStack?** Jump to the domain you want. The exam-scoring detail in each post is useful on its own, even if you skip the lab.

**Preparing to sit the exam?** Read Part 9 alongside the domain posts — it collects the quota limits, common failure modes and exam-day mechanics that are easy to overlook until you are sitting in front of a proctor with three hours on the clock.

---

*This series is our own work, written from the official OpenInfra Foundation documentation and hands-on lab testing. It is not affiliated with or endorsed by the OpenInfra Foundation. The COA is administered by the OpenInfra Foundation; always confirm exam details against the official page before you book.*
