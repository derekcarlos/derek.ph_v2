---
title: "ThinkCenter M70q Thermal Issue"
---

I noticed that my server's fan keep ramping up whenever I do tasks on the VMs in said machine, and I see that the temperature ramps up to around >= 80 degrees Celsius which could be an issue with the thermal paste:

```console
coretemp-isa-0000
Adapter: ISA adapter
Package id 0:  +97.0°C  (high = +80.0°C, crit = +100.0°C)
Core 0:        +92.0°C  (high = +80.0°C, crit = +100.0°C)
Core 4:        +92.0°C  (high = +80.0°C, crit = +100.0°C)
Core 8:        +96.0°C  (high = +80.0°C, crit = +100.0°C)
Core 12:       +97.0°C  (high = +80.0°C, crit = +100.0°C)
Core 16:       +95.0°C  (high = +80.0°C, crit = +100.0°C)
Core 20:       +97.0°C  (high = +80.0°C, crit = +100.0°C)
Core 24:       +92.0°C  (high = +80.0°C, crit = +100.0°C)
Core 28:       +96.0°C  (high = +80.0°C, crit = +100.0°C)
Core 36:       +91.0°C  (high = +80.0°C, crit = +100.0°C)
Core 37:       +91.0°C  (high = +80.0°C, crit = +100.0°C)
Core 38:       +91.0°C  (high = +80.0°C, crit = +100.0°C)
Core 39:       +91.0°C  (high = +80.0°C, crit = +100.0°

acpitz-acpi-0
Adapter: ACPI interface
temp1:        +90.0°C

nvme-pci-0100
Adapter: PCI adapter
Composite:    +36.9°C
```

The above is simulated load by running the following command on the PVE machine:

```bash
stress --cpu 10
```

I got myself a Noctua NH-2 3.5g thermal paste and I would like to install this on the CPU but couldn't get the chance as I don't know how to do it.

## After Application

Idle now sits at around 30s (in Celsius):

```console
coretemp-isa-0000
Adapter: ISA adapter
Package id 0:  +37.0°C  (high = +80.0°C, crit = +100.0°C)
Core 0:        +35.0°C  (high = +80.0°C, crit = +100.0°C)
Core 4:        +34.0°C  (high = +80.0°C, crit = +100.0°C)
Core 8:        +33.0°C  (high = +80.0°C, crit = +100.0°C)
Core 12:       +34.0°C  (high = +80.0°C, crit = +100.0°C)
Core 16:       +37.0°C  (high = +80.0°C, crit = +100.0°C)
Core 20:       +36.0°C  (high = +80.0°C, crit = +100.0°C)
Core 24:       +33.0°C  (high = +80.0°C, crit = +100.0°C)
Core 28:       +36.0°C  (high = +80.0°C, crit = +100.0°C)
Core 36:       +35.0°C  (high = +80.0°C, crit = +100.0°C)
Core 37:       +35.0°C  (high = +80.0°C, crit = +100.0°C)
Core 38:       +35.0°C  (high = +80.0°C, crit = +100.0°C)
Core 39:       +35.0°C  (high = +80.0°C, crit = +100.0°C)

acpitz-acpi-0
Adapter: ACPI interface
temp1:        +41.0°C

nvme-pci-0100
Adapter: PCI adapter
Composite:    +35.9°C
```

Running the same command to simulate load on the machine, the thermals are as follows:

```console
coretemp-isa-0000
Adapter: ISA adapter
Package id 0:  +85.0°C  (high = +80.0°C, crit = +100.0°C)
Core 0:        +82.0°C  (high = +80.0°C, crit = +100.0°C)
Core 4:        +82.0°C  (high = +80.0°C, crit = +100.0°C)
Core 8:        +82.0°C  (high = +80.0°C, crit = +100.0°C)
Core 12:       +84.0°C  (high = +80.0°C, crit = +100.0°C)
Core 16:       +84.0°C  (high = +80.0°C, crit = +100.0°C)
Core 20:       +85.0°C  (high = +80.0°C, crit = +100.0°C)
Core 24:       +81.0°C  (high = +80.0°C, crit = +100.0°C)
Core 28:       +85.0°C  (high = +80.0°C, crit = +100.0°C)
Core 36:       +81.0°C  (high = +80.0°C, crit = +100.0°C)
Core 37:       +81.0°C  (high = +80.0°C, crit = +100.0°C)
Core 38:       +81.0°C  (high = +80.0°C, crit = +100.0°C)
Core 39:       +81.0°C  (high = +80.0°C, crit = +100.0°C)

acpitz-acpi-0
Adapter: ACPI interface
temp1:        +85.0°C

nvme-pci-0100
Adapter: PCI adapter
Composite:    +35.9°C
```
