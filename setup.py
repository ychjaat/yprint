from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in yprint/__init__.py
from yprint import __version__ as version

setup(
	name="yprint",
	version=version,
	description="For easy print format building",
	author="ychvision",
	author_email="ychvision@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
