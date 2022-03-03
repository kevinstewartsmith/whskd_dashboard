const classTimeSchema = mongoose.Schema({
  day: {
    type: String,
    enum: {
      values: ['M', 'T', 'W', 'R', 'F'],
      message: '{VALUE} is not supported'
    }
  },
  period: {
    type: Number,
    min: [1,'Must be at least 1, got {VALUE}'],
    max: [8,'Must be 8 or below, got {VALUE}']
  },

});


const classSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  class_name: {
    type: String,
    required: true
  },
  regular_teacher: {
    type: [String],
    required: true
  },
  class_times: {
    type: [classTimeSchema],
    required: true
  },
  class_type:{
    type: [String],
    required: true
  }

});

const Classes = mongoose.model("classe", classSchema);

const Fruit = mongoose.model("Fruit", fruitSchema);
const Person = mongoose.model("Person", personSchema);

const fruit = new Fruit({
  name: "Jesus Fruit",
  rating: 7,
  review: "Pretty solid as fruits go."
});

{
  _id: 135,
  class_name: 'Fun Fun English B',
  regular_teacher: [ 'Z' ],
  class_times: [
    { day: 'R', period: 6 },
    { day: 'R', period: 7 },
    { day: 'F', period: 7 }
  ],
  class_type: [ 'CDA' ]
}
