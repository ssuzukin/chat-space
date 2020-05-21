require 'rails_helper'
describe Message, type: :model do
  describe '#create' do
    context 'messageを保存できる場合' do
      it "messageが存在すれば保存できること" do
        expect(build(:message, image: nil)).to be_valid
      end

      it "imageが存在すれば保存できること" do
        expect(build(:message, text: nil)).to be_valid
      end

      it "messageとimageが保存すれば登録できること" do
        expect(build(:message)).to be_valid
      end
    end
    context 'messageを保存できない場合' do
      it "messageもimageもなければ保存できないこと" do
        message = build(:message, text: nil, image: nil)
        message.valid?
        expect(message.errors[:text]).to include("を入力してください")
      end

      it "user_idがなければ保存できないこと" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end

      it "group_idがなければ保存できないこと" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
    end
  end
end