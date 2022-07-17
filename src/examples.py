from dataclasses import dataclass
import pandas as pd

@dataclass
class Example:
    _type: str
    data: pd.DataFrame or pd.Series


def get_example(df, example_type, **kwargs):
    if isinstance(df, pd.DataFrame):
        if example_type == "head":
            return Example("head", df.head(**kwargs).fillna("nan").to_dict())
        elif example_type == "tail":
            return Example("tail", df.tail(**kwargs).fillna("nan").to_dict())
        elif example_type == "sample":
            return Example("sample", df[~df.isna()].sample(**kwargs).to_dict())
    elif isinstance(df, pd.Series):
        return Example("sample", list(df[~df.isna()].sample(**kwargs)))



