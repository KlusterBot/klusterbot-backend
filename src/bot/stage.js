function Stage() {
    let self = this;

    self.endMessageTrigger = null;
    self.stages = [];
    self.stageEventsCapture = ["message"];
    let currentStage = 0;

    let stageManager = (event, data) => {
        if (
            self.endMessageTrigger &&
            event === "message" &&
            data?.message === self.endMessageTrigger?.message
        ) {
            self.end();
            return self.endMessageTrigger?.cb(event, data);
        }

        if (!self.stages[currentStage]) {
            self.end();
        } else {
            self.stages[currentStage](event, data, self.next);
        }

        if (self.stages.length == currentStage) {
            return self.end();
        }
    };

    self.addEndMessageTrigger = (message, cb) => {
        self.endMessageTrigger = { message, cb };
    };

    self.next = () => {
        currentStage++;
        if (!self.stages[currentStage]) {
            self.end();
        }
    };

    self.prev = () => {
        currentStage--;
    };

    self.end = () => {
        currentStage = 0;
        self.instance.removeStage(self.id);
        delete self.instance.stageEventsCapture[self.id];
        console.log(self.id + " Stage has ended");
    };

    self.gotTo = (index) => {
        currentStage = index;
    };

    self.add = (stage) => {
        self.stages.push(stage);
    };

    self.setEventCapture = (events) => {
        self.stageEventsCapture = events;
    };

    self.run = (id, instance) => {
        self.id = id;
        self.instance = instance;
        instance.stageEventsCapture[id] = self.stageEventsCapture;
        instance.addStage(id, stageManager);

        console.log(id + " Stage has started");
        self.stages[0](self.next);
    };

    return self;
}

module.exports = Stage;
