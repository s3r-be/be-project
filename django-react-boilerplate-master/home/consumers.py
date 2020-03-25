from channels.generic.websocket import WebsocketConsumer
import json
import time
import os


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    # Follow a file like tail -f.
    # create generator that yields line
    # generators can be iterated through only once
    def follow(self, thefile):
        thefile.seek(0, 2)  # 0 is offset, 2 is whence (relative to file end)
        while True:
            line = thefile.readline()
            if not line:
                time.sleep(0.1)
                continue
            yield line  # return line

    # receive request and start a loop to send network data back
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Returns the Path your .py file is in
        workpath = os.path.dirname(os.path.abspath(__file__))
        logfile = open(os.path.join(workpath, "file.csv"), "r")

        # check if file.csv is populated, number of lines should be greater than 1
        while(len([line for line in logfile]) <= 1):
            continue

        loglines = self.follow(logfile)  # create object of the generator
        # for loop runs the generator code in every iteration
        # once it reaches yield, it returns the line

        for line in loglines:
            line = line.split('$')
            # line contains data separated with $
            # the number of columns is 13
            # however some dataframes will show len < 13 because the data is written incompletely by tshark
            # every few seconds 1 dataframe will be dropped

            if len(line) == 13:
                self.send(text_data=json.dumps({
                    'frame.number': line[0],
                    'frame.time': line[1],
                    'frame.len': line[2],
                    'eth.src': line[3],
                    'eth.dst': line[4],
                    'ip.src': line[5],
                    'ip.dst': line[6],
                    'ip.proto': line[7],
                    'ip.len': line[8],
                    'tcp.len': line[9],
                    'tcp.srcport': line[10],
                    'tcp.dstport': line[11],
                    '_ws.col.Info': line[12]
                }))


class attackNotif(WebsocketConsumer):
    count = 0

    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        self.count += 1
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        self.send(text_data=json.dumps({
            'id': self.count,
            'message': 'test message'
        }))
