from io import StringIO
import pandas as pd

class PreprocessDataFrame:
    def __init__(self, string_input:str, file_extension: str = "csv", delimiter: str = 'none', exclusions: list = []):
        self.string_input = string_input
        self.file_extenssion = file_extension
        self.delimiter = PreprocessDataFrame.map_delimiter("comma" if delimiter == 'none' else delimiter)
        self.exclusions = exclusions
        self.error_state = {}
        self.df = None

    @staticmethod
    def map_delimiter(delimiter):
        return {"comma": ",",
                "semicolon": ":",
                "tab": "\t",
                "space": " ",
                "pipe": "|"
                }.get(delimiter, ",")

    def parse_df(self):
        try:
            byte_repr = StringIO(self.string_input)
        except TypeError as e:
            self.error_state["string_parse"] = e
            print(self.error_state)
            raise
        try:
            print(f"DELIMITER {self.delimiter}")
            self.df = pd.read_csv(byte_repr, sep=self.delimiter)
            return self
        except pd.errors.EmptyDataError as e:
            self.error_state["empty_data"] = e
            print(self.error_state)
            raise
        except ValueError as e:
            self.error_state["data_value_error"] = e
            print(self.error_state)
            raise

    def exclude_columns(self):
        if self.exclusions == ['']:
            pass
        else:
            self.df = self.df.drop(self.exclusions, axis=1)
        return self

    def clean_string_columns(self):
        raise NotImplementedError

    def process_data(self):
        self.parse_df().exclude_columns()
        return self.df