import boto3
import json
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

table = dynamodb.Table('EVOC_DB')

print(table.key_schema)
counter = 1

response = table.get_item(
	Key={
		'TIMESTAMP': counter
	}
)
item = response['Item']
print(item)

response = table.query(
	Limit=1,
	ScanIndexForward=False,
	ConditionExpression=('ID').eq(1)
)

for i in response['Items']:
    print(i)