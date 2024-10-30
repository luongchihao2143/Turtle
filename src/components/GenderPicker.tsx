import { colors } from "@/constants/colors";
import { Gender, GenderName } from "@/redux/reducer/authSlice";
import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import CustomText, { FONT_WEIGHT } from "./CustomText";

export interface DropdownPickerItem {
  value: string;
  label: string;
}

interface DropdownPickerProps {
  label?: string;
  items: DropdownPickerItem[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
}

const GenderPicker = ({
  label,
  items,
  selectedItem,
  setSelectedItem,
}: DropdownPickerProps) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const onPressButton = () => {
    setIsVisibleModal(true);
  };

  const onCloseModal = () => {
    setIsVisibleModal(false);
  };

  const onSelectGender = useCallback(
    (itemSelectedValue: string) => {
      setSelectedItem(itemSelectedValue);
      onCloseModal();
    },
    [setSelectedItem],
  );

  const _renderItem = useCallback(
    ({ item }: { item: DropdownPickerItem }) => {
      const isItemSelected = selectedItem === item.value;
      return (
        <Pressable
          className="flex-row justify-between items-center p-[12] rounded-[12px]"
          style={isItemSelected && styles.selectedItemContainer}
          onPress={() => onSelectGender(item.value)}>
          <CustomText
            color={isItemSelected ? colors.white : colors.primaryText}
            fontWeight={FONT_WEIGHT.MEDIUM}
            text={item.label}
          />
          {isItemSelected && (
            <AntDesign name="check" color={colors.white} size={16} />
          )}
        </Pressable>
      );
    },
    [onSelectGender, selectedItem],
  );

  const _renderGenderName = useMemo(() => {
    if (!selectedItem) {
      return "";
    }
    return GenderName[selectedItem as Gender];
  }, [selectedItem]);

  const _renderHeaderList = useMemo(
    () => (
      <View className="w-full justify-center items-center">
        {label && (
          <CustomText
            color={colors.primaryText}
            fontWeight={FONT_WEIGHT.BOLD}
            fontSize={16}
            text={label}
            style={styles.headerLabel}
          />
        )}
      </View>
    ),
    [label],
  );

  const _renderPickerView = useMemo(
    () => (
      <View className="w-full bg-white rounded-[16px]">
        <View className=" w-full p-[16]">
          <FlatList
            ListHeaderComponent={_renderHeaderList}
            data={items}
            renderItem={_renderItem}
          />
        </View>
      </View>
    ),
    [_renderHeaderList, _renderItem, items],
  );

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
        <CustomText text={_renderGenderName} />
        <AntDesign size={16} name="down" />
      </Pressable>
      <Modal onBackdropPress={onCloseModal} isVisible={isVisibleModal}>
        {_renderPickerView}
      </Modal>
    </View>
  );
};

export default GenderPicker;

export const styles = StyleSheet.create({
  selectedItemContainer: {
    backgroundColor: colors.primary,
  },
  headerLabel: {
    marginBottom: 12,
  },
});
