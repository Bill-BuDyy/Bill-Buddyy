import { Schema, model, Document, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface ActivityInterface extends Document {
  activityType: string;
  performedBy: Schema.Types.ObjectId;
  affectedEntity: {
    id: Schema.Types.ObjectId,
    type: String,
  };
  details: Object;
  createdAt: Date;
}

const ActivitySchema = new Schema<ActivityInterface>({
  activityType: {
    type: String,
    required: true,
  },
  performedBy: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
  affectedEntity: {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  details: {
    type: Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ActivitySchema.plugin(paginate);

const ActivityModel = model<ActivityInterface, PaginateModel<ActivityInterface>>('Activity', ActivitySchema);

export default ActivityModel;
