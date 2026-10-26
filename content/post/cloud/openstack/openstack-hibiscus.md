+++
author = "Kishore"
title = "OpenStack 2026.2 Hibiscus: what's new in the 34th release"
date = "2026-10-29"
description = "A tour of OpenStack 2026.2 Hibiscus, the 34th release: confidential computing with AMD SEV-SNP and Intel TDX, DNS and post-quantum security work, accelerator and HPC storage support, and the efficiency gains in Neutron, Glance and Watcher."
tags = ["Cloud", "Openstack", "IaaS"]
categories = "Cloud"
draft = true
+++

## Hibiscus in one paragraph

OpenStack **2026.2 "Hibiscus"** was released on 30 September 2026 — the 34th release of the project. Around 600 contributors worked through the six-month cycle, landing roughly 11,500 code changes, and the community's official framing is "trusted infrastructure for the AI era."

Two threads run through the whole release: **confidential computing**, and **making accelerated and high-performance hardware first-class citizens** of the platform. Everything else is hardening and efficiency work — which, for anyone actually operating a cloud, is usually the part that matters.

![OpenStack 2026.2 Hibiscus release announcement](/images/openstack-hibiscus/001.png)

## The numbers

| Metric | Hibiscus (2026.2) | Change vs 2026.1 Gazpacho |
|---|---|---|
| Contributors | ~600 | +21% |
| Code changes | ~11,500 | +28% |
| Zuul CI jobs during the cycle | ~1.6 million | — |
| Released | 30 September 2026 | — |

The Zuul figure is worth pausing on: OpenStack's gate is one of the largest continuous integration systems in open source, and it is what makes a six-monthly release of this many interdependent services possible at all.

{{% notice info "Read the highlights with the project's own caveat" %}}
Most of what follows traces back to the [official release highlights page](https://releases.openstack.org/hibiscus/highlights.html), and that page carries a note from the Foundation itself: the entries are "significant changes reported directly from the project teams and **have not been processed in any way**." Treat them as a starting point for the per-project release notes, not as a curated feature list.
{{% /notice %}}

![OpenStack 2026.2 Hibiscus release highlights](/images/openstack-hibiscus/002.png)

## Hibiscus is not a SLURP — check your upgrade path first

This is the single most practical thing in the release, and it's easy to miss in the feature lists.

OpenStack labels every second release a **SLURP** (Skip Level Upgrade Release Process). You are expected to upgrade between SLURP releases and skip the normal release in between — which is why that label matters more than it sounds like it should.

**2026.1 Gazpacho was the SLURP. Hibiscus is not.** That means if you are running Gazpacho, you have a genuine choice:

- take Hibiscus for the security and confidential-computing work, or
- **skip Hibiscus entirely** and upgrade straight to **2027.1 Indri**, the next SLURP, expected in March 2027.

| Release | Codename | Type | Status |
|---|---|---|---|
| 2027.1 | Indri | SLURP | In development (~March 2027) |
| **2026.2** | **Hibiscus** | Normal | Maintained |
| 2026.1 | Gazpacho | SLURP | Maintained |
| 2025.2 | Flamingo | Normal | Maintained |
| 2025.1 | Epoxy | SLURP | Maintained |

Both routes are supported. Pick deliberately rather than by habit.

## Confidential computing: AMD SEV-SNP and Intel TDX

This is the headline. Nova now supports two hardware-backed memory encryption technologies:

- **AMD SEV-SNP** — the third generation of AMD's Secure Encrypted Virtualization. It provides stronger integrity protection than SEV-ES and enables **platform attestation**, so a guest owner can verify the integrity of a VM through signed attestation reports. Request it with `hw:mem_encryption_model=amd-sev-snp` as a flavor extra spec, or as the `hw_mem_encryption_model=amd-sev-snp` image property.
- **Intel TDX** (Trust Domain Extensions) on 5th Gen Xeon Scalable and later. TDX gives hardware-enforced memory encryption and CPU state isolation, protecting guests from the hypervisor and other privileged software. Request it with `hw:mem_encryption_model=intel-tdx`. Attestation is served through the Quote Generation Service.

![Nova's confidential computing work in the Hibiscus release highlights](/images/openstack-hibiscus/003.png)

{{% notice warning "This is silicon, not config" %}}
Both are CPU features. You need the right processor generation and the corresponding host configuration — you cannot simply enable memory encryption on arbitrary hardware by editing a config file.

There is also an upgrade trap here: `nova-compute` now refuses to start if a host has AMD SEV-SNP enabled in hardware (detected via `sev_snp` in `/sys/module/kvm_amd/parameters/`) while any instance on that host still requires **SEV-ES**. Migrate or delete the SEV-ES instances before enabling SEV-SNP in firmware.
{{% /notice %}}

For multi-tenant clouds where the tenant does not fully trust the operator, this is the most consequential change in the release.

## Accelerators, HPC storage and bare metal

The AI-adjacent work is spread across several projects rather than concentrated in one:

- **Nova and Cyborg** — Nova's libvirt driver can now work with **Cyborg-managed mediated devices** such as vGPUs, through a new `MDEV` accelerator request binding type. The two paths can coexist: a new `OWNER_NOVA` trait prevents scheduling collisions between Nova-managed and Cyborg-managed devices, so you can hand vGPU lifecycle management to Cyborg without a flag day.
- **Cyborg** — operators gained finer-grained control over which Intel SR-IOV NIC devices Cyborg manages, and the generic PCI driver returned to fully supported status.
- **Manila** — new **Weka** and **Lustre** backends, which opens up parallel filesystems for data-hungry AI and HPC workloads. Manila also gained mountable snapshots that inherit access rules from their parent share, and drivers for Dell PowerScale, HPE Alletra MP B10000 and others picked up snapshot lifecycle support.
- **Ironic and Nova** — coordinated work substantially improved the performance of resource tracking in `nova-compute` when running the Ironic driver. That matters on large, heterogeneous bare-metal fleets, and a new `[compute]update_resources_max_workers` option lets you parallelise the update further — trading extra `nova-compute` CPU and Placement API concurrency for a faster startup.

{{% notice warning "Manila and TLS defaults changed" %}}
The Pure Storage FlashBlade, Hitachi HSP and NetApp ONTAP drivers now **verify TLS certificates by default**. If you use self-signed certificates, supply a CA bundle or install the certificate in the system trust store *before* upgrading, or those drivers will start failing.
{{% /notice %}}

## Security fixes worth reading the advisories for

Hibiscus cleans up a sizeable batch of security work. The ones I would not skip:

- **Designate — OSSA-2026-034** (CVE-2026-71193, CVE-2026-71194): a cross-tenant zone ownership bypass. A tenant could create a subzone, superzone or duplicate of another tenant's zone by scheduling it to a different pool, which enables DNS hijacking and denial of service.
- **Cyborg — CVE-2026-40213, CVE-2026-40214**: accelerator resources were not properly scoped to projects, so one tenant could see or manipulate another's accelerators.
- **Glance — CVE-2026-71196, CVE-2026-71197, CVE-2026-71198**: addressed in the 2026.2 images.

There is one more change that is a security *improvement* rather than a fix, and it is worth calling out. Manila CephFS shares attached to instances now use a **per-instance, per-host `cephx` identity** instead of a single shared `nova` identity. Previously, a `cephx` key recovered from one instance or compute host granted access to **every** CephFS share in the cloud. Grants created before the upgrade keep the shared identity until the instance next mounts the share, so the exposure closes gradually as instances are restarted or migrated.

The Designate fix is more than the advisory, too: zone ownership conflict checks now search across **all** pools, and the previously unscoped mDNS record lookups that made the bypass exploitable are now scoped by pool. TSIG key scope validation was added, and TSIG keys are now required for zones scheduled to non-default pools.

Designate also gained some forward-looking work:

- **TLSA records** (RFC 6698), for DANE certificate pinning.
- A **BIND9 backend for split-horizon DNS**, with per-view TSIG keys so that outgoing NOTIFY and SOA-polling messages reach the correct view regardless of the worker's source IP.
- **Post-quantum readiness tooling**, including a configurable check that can block service startup when it finds quantum-vulnerable certificate algorithms or outdated TLS versions.

## Eventlet is finally on the way out

Not glamorous, but this is the change that will ripple through every deployment eventually. OpenStack has been moving its services off the [eventlet](https://eventlet.readthedocs.io/) monkey-patching model and onto native Python threading, and Hibiscus is where it becomes clearly visible.

Glance's release notes say eventlet was **removed completely**. I checked that against the source rather than taking the notes at their word — comparing the two branches:

```conf
# stable/2026.1 requirements.txt (Gazpacho)
eventlet>=0.33.3 # MIT
...
oslo.service>=4.2.0 # Apache-2.0
```

```conf
# stable/2026.2 requirements.txt (Hibiscus)
...
oslo.service[threading]>=4.2.0 # Apache-2.0
```

No eventlet, and `oslo.service` has moved to its `[threading]` extra. Elsewhere in the release:

- **Manila** — all services now use native Python threading by default. While you migrate, setting `OS_MANILA_DISABLE_EVENTLET_PATCHING=False` forces the legacy eventlet behaviour.
- **Nova** — native threading is now the default concurrency mode for almost all services. The console proxies (`novncproxy`, `serialproxy`, `spicehtml5proxy`) gained threading support but still default to eventlet. A new `[DEFAULT] concurrency_backend` option joins the existing `OS_NOVA_DISABLE_EVENTLET_PATCHING` environment variable.
- **Watcher** — all services now run on native Python threading by default.

The legacy eventlet mode is deprecated and will be removed in a future release — the Nova notes commit to "not earlier than 2027.2".

If your deployment carries any eventlet-specific tuning, configuration or monkey-patching assumptions, that is now on a clock.

## More efficient at scale

Small numbers, big consequences on large clouds:

- **Neutron** cut the memory footprint of ML2/OVS HA router deployments by **more than 15x** — keepalived state-change monitoring moved from a daemon to a shell script.
- **Neutron** added a **Private VLAN (PVLAN)** service plugin, an alternative port-isolation model: ports on a PVLAN-enabled network are *promiscuous* (talk to anything), *isolated* (talk only to promiscuous ports) or part of a *community* (talk only within the community plus promiscuous ports). Ports and network properties must be on a network carrying the new `pvlan` property.
- **Neutron** brought the **L3 Agent Scheduler API** to ML2/OVN — including `ha_chassis_priority` for gateway failover ordering within an HA chassis group — and added an **EVPN service plugin** with an OVN agent extension for BGP EVPN, so tenant prefixes can be advertised into the data centre fabric via FRR.
- **Glance** added **parallel image imports**, downloads from preferred stores, new APIs to clean and prune the cache, an API to list cached nodes, and S3 credential-free location URLs.
- **Watcher** now makes workload consolidation decisions that account for **reserved capacity**, not just live usage, which makes its recommendations more realistic. It also gained two new actions — one to delete an instance and its resources, and one to shelve an instance to reclaim host capacity while keeping its data.

{{% notice warning "Neutron may refuse to start after an upgrade" %}}
Neutron now refuses to start when `[ml2_type_vlan] network_vlan_ranges` no longer covers a VLAN ID that an existing network segment still holds — for example because you narrowed a range, or dropped a physical network from it. The error names the physical networks and VLAN IDs involved.

Restore the ranges, or delete the networks holding those VLAN IDs, before starting Neutron again. Segments created through the API are not affected: their allocated ranges are kept and Neutron starts normally, so an administrator is never locked out of the API by their own change.
{{% /notice %}}

## Platform housekeeping

- **Horizon** is ready for the new secure RBAC defaults: oslo.policy's `enforce_scope` and `enforce_new_defaults` are now enabled by default, and domain-scoped tokens are no longer preferred. Review your policy files before upgrading.
- **Horizon** added Python **3.14** support and dropped Python 3.9 and 3.10, with Django 5.2 now a voting job. Instance passwords can also now be changed from the dashboard, provided the QEMU guest agent is running inside the guest.
- **Nova** can unpin and re-pin an instance's availability zone through a new microversion of `PUT /servers/{server_id}` — so you can move a server between AZs without deleting and recreating it. Cold migration and resize now also work for instances with `virtiofs` Manila share attachments.
- **Nova** removed Linux bridge VIF support entirely — `VIF_TYPE_BRIDGE` is gone from the libvirt driver. Neutron removed Linux bridge back in 2025.1 (Epoxy), so if you are somehow still using it, migrate to OVS or OVN *before* upgrading: instances with `binding:vif_type=bridge` ports will fail to start on upgraded compute nodes. Nova also dropped Python 3.10; its minimum is now Python 3.11.
- **Freezer** finally removed its v1 API, and the Python client is now installable as a plugin to the OpenStack Client — so backup operations appear under `openstack backup`.
- **Ironic** added a container console provider and continued TLS hardening for post-quantum policy enforcement. It also weathered more security bugs this cycle than in any other six-month period in the project's history.

## What I would do before upgrading

1. **Decide skip or take.** If you are on Gazpacho, you may go straight to Indri in March 2027.
2. **Track the CVEs.** Designate, Cyborg and Glance all shipped fixes in this cycle, and the CephFS identity change is worth planning around.
3. **Fix certificates first** if you run Manila with the Pure Storage FlashBlade, Hitachi HSP or NetApp ONTAP drivers on self-signed certificates.
4. **Check your networking assumptions.** Nova no longer supports Linux bridge VIFs at all, and Neutron will refuse to start if your `network_vlan_ranges` no longer cover VLAN IDs still held by existing segments.
5. **Review RBAC policies.** Cyborg's persona-based policy defaults are opt-in now and are planned to become the default in 2027.1, so migrate on your own schedule rather than under pressure.
6. **Decouple the concurrency change from the upgrade.** The Nova team's own advice is either to test native threading on Gazpacho first, or to pin `[DEFAULT] concurrency_backend` to `eventlet` for the upgrade and switch to `threading` once it has succeeded.

## Where this fits

Hibiscus is a normal (non-SLURP) release, so the next decision point for most operators is **2027.1 Indri** in March 2027. If you are building a lab rather than running production, Hibiscus is a perfectly good target — the confidential computing work in particular is worth experimenting with if you have access to SEV-SNP or TDX hardware.

If you want a quicker way into OpenStack before then, my [MicroStack walkthrough](/post/cloud/canonical/microstack/) gets a working cloud up on a single Ubuntu machine.

---

*This post summarises the official [Hibiscus release announcement](https://www.openstack.org/software/openstack-hibiscus/), the [release highlights](https://releases.openstack.org/hibiscus/highlights.html) and the per-project notes — principally [Nova 34.0.0](https://docs.openstack.org/releasenotes/nova/2026.2.html). Config options, extra specs and behaviour are quoted from those pages. The Glance eventlet removal was verified directly against the `stable/2026.1` and `stable/2026.2` requirements files rather than taken from the release notes alone.*
