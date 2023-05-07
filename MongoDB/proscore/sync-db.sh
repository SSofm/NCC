mongodump --uri="mongodb://thao.vuthiphuong:thao007@10.47.0.7:27017/soccer?authSource=soccer&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"


mongorestore --uri="mongodb://admin:123456@172.16.11.19:27017/proscore?authSource=admin&readPreference=primary&directConnection=true&ssl=false" dump/soccer