import { Schema, model, Document, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface GroupInterface extends Document {
  groupName: string;
  members: Schema.Types.ObjectId[];
  createdAt: Date;
  createdBy: Schema.Types.ObjectId;
  description?: string;
}

const GroupSchema = new Schema<GroupInterface>({
  groupName: {
    type: String,
    required: true,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'UserModel'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true
  },
  description: {
    type: String,
    default: "",
  },
});

GroupSchema.plugin(paginate);

const GroupModel = model<GroupInterface, PaginateModel<GroupInterface>>('GroupModel', GroupSchema);

export default GroupModel;
