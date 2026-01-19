# diploma_clouds_ui

1. git checkout dev
2. git pull


### для работы с чем либо 
``` 
git checkout -b feature/auth-page
git add file/dir
git commit -m "file/dir added"
git add another_file/dir
git commit -m "another_file/dir added"
git add README.md
git commit -m "openvpn docs added"
git push -u origin feature/auth-page
git checkout dev
```

### удаление лишних веток
``` 
git fetch --all --tags --prune --jobs=10 - почистит локальные, если такой нет в репозитории
git branch --delete feature/auth-page - удалит локально
```


## пример веток
- feature/имя-фичи
- hotfix/имя-бага
- docs/имя-документа(мб описания)



## stack
###    frontend
    react

###    backend
    golang



## docker
###  для докера
```
docker build -t IMAGENAME:TAG .
docker run -d --name NAME -p 3000:3000 --restart always IMAGENAME:TAG
docker stop NAME 
docker rm NAME
docker ps -a
```
