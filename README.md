# HandyHome
## Overview
HandyHome is an open source DIY video guide platform where users can view, add, edit, and delete DIY videos in one central location. HandyHome includes: 
* Landing page with a brief introduction and an automated carousel of current DIY guides
* A page that lists out all current guides, including category filters and key word search functionality
* User authentication functionality that allows users to Add guides to the overall list and save guides to their own personal list (in progress)
* Each guide on HandyHome is stored in a postgres database table that includes information based on the following model:
```python
    title = models.CharField(max_length=100)
    subject = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    author = models.CharField(null=True, max_length=80)
    length = models.IntegerField()
    link = models.CharField(max_length=300)
```

## Links
[HandyHome](https://diyfrontend.herokuapp.com/)

[Front End GitHub Repo](https://github.com/sean-r-g/DIY-app-frontend)

[Back End GitHub Repo](https://github.com/sean-r-g/DIY-app-backend)
