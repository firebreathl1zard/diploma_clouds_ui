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
    react(nodejs):
        "bootstrap": "^5.3.3",
        "react": "^18.3.1",
        "react-beautiful-dnd": "^13.1.1",
        "react-dom": "^18.3.1",
        "react-router-dom": "^6.27.0",

###    backend
    golang