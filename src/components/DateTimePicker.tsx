import { colors } from "@/constants/colors";
import { formatDateToDMY } from "@/utils/formatDateTime";
import { AntDesign } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import DatePicker from "react-native-date-picker";
import CustomText, { FONT_WEIGHT } from "./CustomText";

interface DateTimePickerProps {
  date?: Date;
  setDate: (val?: Date) => void;
  label?: string;
}

const DateTimePicker = ({ date, label, setDate }: DateTimePickerProps) => {
  const [isShown, setIsShown] = useState(false);

  const onPressButton = () => setIsShown(true);

  const onConfirm = (date?: Date) => {
    setIsShown(false);
    setDate(date);
  };

  const onCancel = () => {
    setIsShown(false);
  };

  const _renderFormattedDate = useMemo(() => {
    if (!date) {
      return "";
    }
    return formatDateToDMY(date);
  }, [date]);

  return (
    <View className="w-full">
      {label && (
        <CustomText
          color={colors.inputText}
          text={label}
          style={{ marginBottom: 4 }}
          fontSize={14}
          fontWeight={FONT_WEIGHT.REGULAR}
        />
      )}
      <Pressable
        onPress={onPressButton}
        className="flex-row p-[16] justify-between gap-x-[12[ items-center border-[1px] rounded-[10px]  border-inputBorder">
        <CustomText text={_renderFormattedDate} />
        <AntDesign size={16} name="down" />
      </Pressable>

      <DatePicker
        modal
        open={isShown}
        maximumDate={new Date()}
        mode="date"
        date={date || new Date()}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </View>
  );
};

export default DateTimePicker;
