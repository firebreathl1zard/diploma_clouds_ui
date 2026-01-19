
---
### GET https://api.firebreathlizard.space/api/v1/projects
### response:
```json
{
  "projects": [
    {
      "project_id": 286,
      "title": "CityZ"
    },
    {
      "project_id": 244,
      "title": "Автотовары"
    },
    {"..."},
  ]
}
```

---
### GET https://api.firebreathlizard.space/api/v1/project/id/team

### example
https://api.firebreathlizard.space/api/v1/project/285/team

### response:
```json
{
  "users": [
    {
      "user_id": 23,
      "login": "i21s610",
      "f_name": "Иван",
      "l_name": "Безменов",
      "avatar_url": "https://www.gravatar.com/avatar/4acc22ad3baa829d68249cbc6160fd73?default=mm"
    },
    {
      "user_id": 34,
      "login": "i22s0613",
      "f_name": "Вадим",
      "l_name": "Пономарев",
      "avatar_url": "https://www.gravatar.com/avatar/ea154af08c59a0c47d36cb46e817f775?default=mm"
    },
    {
      "user_id": 94,
      "login": "i22s0626",
      "f_name": "Кирилл",
      "l_name": "Давыдов",
      "avatar_url": "https://www.gravatar.com/avatar/ba3e3853765b24a4ad041e47f2c62219?default=mm"
    },
    {
      "user_id": 54,
      "login": "i22s0636",
      "f_name": "Екатерина ",
      "l_name": "Туманова ",
      "avatar_url": "https://www.gravatar.com/avatar/a9c88ed99040b04f1a3173140f6182da?default=mm"
    }
  ]
}
```

---
### GET https://api.firebreathlizard.space/api/v1/project/id/vms

### example
https://api.firebreathlizard.space/api/v1/project/285/vms

### response:
```json
{
  "project_id": 285,
  "vminfo": [
    {
      "configuration": [
        {
          "cpu": 1,
          "ram": 2
        }
      ],
      "vm_id": 5,
      "vm_identifier": "120",
      "vm_name": "285-SA-pbalzx",
      "vm_ip_address": "127.0.0.1,10.3.19.129",
      "vm_domain_name": "285-SA-pbalzx.local",
      "vm_purpose": "SA",
      "status": "started"
    }
  ]
}
```

---
### GET https://api.firebreathlizard.space/api/v1/project/id/vm/id

### example
https://api.firebreathlizard.space/api/v1/project/285/vm/5

### response:
```json
{
  "project_id": 285,
  "vm_id": 5,
  "packages": [
    {
      "id": "26",
      "package_name": "C++ (gcc)",
      "package_version": "12.2.0",
      "type": "latest",
      "description": " "
    },
    {
      "id": "27",
      "package_name": "Node.js",
      "package_version": "18.17.1",
      "type": " ",
      "description": " "
    },
    {"..."},
  ],
  "ssh_keys": [
    {
      "id": "2",
      "user_id": "i21s610",
      "title": "first",
      "ssh_key": "ssh-rsa AAAAB..."
    },
    {"..."},
  ]
}
```

---
### GET https://api.firebreathlizard.space/api/v1/vm/confs
### response:
```json
{
  "vm_configurations": [
    {
      "id": 1,
      "name": "lightLoad",
      "cpu": 1,
      "ram": 2,
      "storage": 32,
      "cost": 0
    },
    {"..."},
  ]
}
```

---
### GET https://api.firebreathlizard.space/api/v1/sshkeys

### example
https://api.firebreathlizard.space/api/v1/sshkeys

### response:
```json
{
  "login": "i21s610",
  "user_ssh_keys": [
    {
      "id": "2",
      "title": "first",
      "ssh_key": "ssh-rsa AAAAB..."
    },
  ]
}
```

---
### GET https://api.firebreathlizard.space/api/v1/vm/metrics?vmid=vmid

### example
https://api.firebreathlizard.space/api/v1/vm/metrics?vmid=17

### response:
```json
{
  "metrics": [
    {
      "name": "329-DB-su9gw0",
      "vmid": 102,
      "status": "running",
      "uptime": 100435,
      "mem": 590413824,
      "maxmem": 17179869184,
      "cpu": 0.00401961537464853,
      "cpus": 8
    }
  ]
}
```

---
### GET https://api.firebreathlizard.space/api/v1/finances/current?project=project_id

### example
https://api.firebreathlizard.space/api/v1/finances/current?project=285

### response:
```json
{
  "project_id": "285",
  "finances": 100
}
```

---
### GET https://api.firebreathlizard.space/api/v1/user/login

### response:
```json
{
  "userlogin":"i21s610",
  "userRole": "student"
}
```

---
### GET https://api.firebreathlizard.space/api/v1/package/all

### response:
```json
{
    "packages": [
        {
            "package_id": "1",
            "package_name": "Node.js"
        },
        {
            "package_id": "2",
            "package_name": "Python"
        },
        {
            "package_id": "3",
            "package_name": "Java"
        },
        {
            "package_id": "4",
            "package_name": "Kotlin"
        },
        {
            "package_id": "5",
            "package_name": "Go"
        },
        {
            "package_id": "6",
            "package_name": "C# (dotnet)"
        }
    ]
}
```

---
### GET https://api.firebreathlizard.space/api/v1/package/selected?package_id="1"

### response:
```json
{
    "package": "Node.js",
    "versions": [
        {
            "id": "1",
            "version": "0.1.14"
        },
        {
            "id": "2",
            "version": "0.1.15"
        },
        {
            "id": "3",
            "version": "0.1.16"
        },]
}
```

---
### POST https://api.firebreathlizard.space/api/v2/login

### request:
```json
{
    "username": "username",
    "password": "password"
}
```

### example
```bash
curl -X POST https://api.firebreathlizard.space/api/v2/login \
-H "Content-Type: application/json" \
-d '{
    "username": "username",
    "password": "password"
}'
```

### response:
```json
{"message":"Login successful"}  
OR
{"message":"Unauthorized"} 
```

---
### POST https://api.firebreathlizard.space/api/v1/vm/create
### request:
```json
{
    "vmConfigurationID": "vmConfigurationID",
    "projectID": "projectID",
    "purpose": "purpose"
}
```

### example
```bash
curl -X POST https://api.firebreathlizard.space/api/v1/vm/create \
-H "Content-Type: application/json" \
-d '{
    "vmConfigurationID": "1",
    "projectID": "285",
    "purpose": "SA"
}'
```

### response:
```json
vm creation complete!
```

---
### POST https://api.firebreathlizard.space/api/v1/sshkey/save
### request:
```json
{
    "ssh_key": "ssh_key",
    "title": "title"
}
```

### example
```bash
curl -X POST https://api.firebreathlizard.space/api/v1/sshkey/save \
-H "Content-Type: application/json" \
-d '{
    "ssh_key": "ssh-rsa AAAAB3...",
    "title": "first"
}'
```

### response:
```json
{"message": "SSH key received successfully"}
```

---
### POST https://api.firebreathlizard.space/api/v1/sshkey/apply
### request:
```json
{
    "vm_id": "vm_id",
    "ssh_key_id": "ssh_key_id"
}
```

### example
```bash
curl -X POST https://api.firebreathlizard.space/api/v1/sshkey/apply \
-H "Content-Type: application/json" \
-d '{
    "vm_id": "37",
    "ssh_key_id": "1"
}'
```

### response:
```json
{"message": "SSH key received successfully"}
```

---
### POST https://api.firebreathlizard.space/api/v1/vm/action

actions:
- "start"
- "shutdown" - good way to stop vm
- "stop" - hard way to poweroff (pulling the power plug)
- "reboot"
- "reset" - hard reboot
- "destroy"

### request:
```json
{
    "vm_id": "vm_id",
    "action": "action"
}
```

### example
```bash
curl -X POST https://api.firebreathlizard.space/api/v1/vm/action \
-H "Content-Type: application/json" \
-d '{
    "vm_id": "1", 
    "action": "start"
}'
```

---
### POST https://api.firebreathlizard.space/api/v1/finances/set

### request:
```json
{
    "project_id": "project_id",
    "finances": "finances"
}
```

### example
```bash
curl -X POST https://api.firebreathlizard.space/api/v1/finances/set \
-H "Content-Type: application/json" \
-d '{
    "project_id": "285",
    "finances": "1000"
}'
```

### response:
```json
{"message":"finances added"}
```

---
### POST https://api.firebreathlizard.space/api/v1/package/install

### request:
```json
{
    "vm_id": "vm_id",
    "packages": [
        {
        "package_id": "package_id",
        "package_version_id": "package_version_id"
        },
        {
        "package_id": "package_id",
        "package_version_id": "package_version_id"
        },
        {}
    ]
}
```

### example
```bash
curl -X POST https://api.firebreathlizard.space/api/v1/package/install \
-H "Content-Type: application/json" \
-d '{
    "vm_id": "60",
    "packages": [
        {
        "package_id": "1",
        "package_version_id": "767"
        },
        {
        "package_id": "2",
        "package_version_id": "1000"
        },
        {}
    ]
}'
```


---
### DELETE https://api.firebreathlizard.space/api/v1/sshkey/delete
### request:
```json
{
    "ssh_key_id": "ssh_key_id"
}
```